const view = document.querySelector('#wrapper');

const errmsg_nobackend = '다운로드 프로그램 미작동'
const errmsg_isNotLearningX = 'LearningX 아님';
const errmsg_scan = '강의영상 없음';

(async () => {
  var tab = await new Promise( r => (chrome.tabs.query({active: true, currentWindow: true})).then( rr => r(rr[0]) ) );

  view.innerHTML = errmsg_nobackend;
  try {
    var ws = new WebSocket('ws://localhost:52022'); // Is there a way to dynamically handshake socket?  
    await new Promise( r => {
      ws.onopen = () => {
        r();
      }
    })
  } 
  catch
  {
    return;
  }
  

  chrome.scripting.executeScript(
    {
      target: {tabId: tab.id},
      func: () => {
        try {
          return window.document.URL
        } catch {
          return null
        }
      },
    },
    (result) => {
      if (result) {
        url = result[0].result;
        if (!/https:\/\/[a-zA-Z0-9.]+\/courses\/.+/g.test(url) ) {
          view.innerHTML = errmsg_isNotLearningX
        } else {
          scan();
        }
      }
    }
  );

  async function scan() {
    var videos = [];

    var results = await chrome.scripting.executeScript(
      {
        target: {tabId: tab.id, allFrames: true},
        func: () => {
          try {
            return document.evaluate('//*[@id="root"]/div/div[2]/div[2]/iframe', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src
          } catch {
            return null
          }
        }
      }
    );

    for (var res of results) {
      let url = res.result
      if (url) {
        videos.push(url);
      }
    }

    listVideos(videos);
  }

  async function listVideos(videos) {
    view.innerHTML = '';
    if (videos.length > 0) {
      for (var video of videos) {
        var id = video.toString().split('?')[0].split('/').pop();
        var res = await fetch("https://commons.khu.ac.kr/viewer/ssplayer/uniplayer_support/content.php?content_id=" + id);
        var text = await res.text();
        var dom = (new DOMParser()).parseFromString(text, 'text/xml');

        var lectName = dom.getElementsByTagName('title')[0].textContent;
        var f = dom.getElementsByTagName('main_media')[0];
        var url = dom.getElementsByTagName('media_uri')[0].textContent.replace('[MEDIA_FILE]',f.textContent) + '?token=' + f.getAttribute('auth_value');
        var ext = f.textContent.split('.').pop();


        var a = document.createElement('a');
        a.href = video;
        a.target = '_blank';
        a.textContent = lectName;
        a.onclick = () => {
          try {
            // websocket으로 backend nodejs websocketserver에 download info json 전달
            ws.send(JSON.stringify({url:url, filename:lectName+'.'+ext, host:'https://commons.khu.ac.kr/'}));

          } catch (err) {
            alert(`오류: ${err.message}`);
          }

        }
        view.appendChild(a);
      }
    } else {
      view.innerHTML += `<div style="margin-top:5px; color: crimson;">${errmsg_scan}</div>`;
    }
  }
})();