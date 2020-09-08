[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fzinirun%2FLMSDownloader&count_bg=%2359AAE9&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com) ![vanilla-js](http://vanilla-js.com/assets/button.png)
# LMSDownloader
🐻 단국대학교 이러닝 다운로더

- 단국대학교 이러닝 강의 컨텐츠를 다운로드할 수 있는 <img src="https://www.zotero.org/static/images/icons/chrome-icon-128%402x.png" width=20> 크롬 확장 프로그램입니다.
- LearningX 기반의 타학교 이러닝 시스템에 약간의 코드 변형시 적용할 수 있을 것 같으며 fork 후 배포 환영합니다.


![dankook-logo](icon.png)
(본 로고 이미지와 프로그램 아이콘은 [단국대학교](http://www.dankook.ac.kr/web/kor/-ui-)의 저작물입니다.)

> 본 프로그램은 단국대학교/관련 기관과 관련이 없으며, 단국대학교가 보증하지 않았습니다. 단순히 학우들의 원만한 이러닝 학습을 위한 프로그램이며 어떠한 수익도 창출하지 않음을 알려드립니다.

## ✔️ 사용 방법
[사용법/제작자](https://zinirun.github.io/LMSDownloader/index.html) 문서를 참조하세요.

## ✔️ 제작 이유
새로운 이러닝의 강의는 열람 기간이 정해져 있거나, 완강하지 않으면 앞의 내용을 볼 수 없는 등 불편함이 많아서 마음 편하게 강의 동영상을 다운로드 받아 놓고 보기 위해 제작했습니다. (예를 들어 이러닝 영상은 학습 완료를 위해 틀어놓고 다운로드 받은 영상으로 배속을 이용하거나, 복습할 수 있습니다)

## ✔️ 기여하기/아이디어
본 다운로더는 크롬 확장기능을 이용한 Javascript 기반의 프로그램입니다. `popup.js`에서 발생한 다운로드 메시지 스캔한 비디오 주소와 함께 보내면 `background.js`에서 받아서 `chrome.downloads` 모듈을 통해 다운로드하는 방식입니다.

버튼 하나로 이러닝 강의컨텐츠에서 바로 다운받을 수 있게 만들고 싶었지만, 실제 강의 동영상은 4개의 `iframe`으로 감싸져 있고, 마지막 `iframe`은 외부의 접근을 막아놓아서 `이러닝 스캔` 후 `동영상 다운로드`의 로직을 사용할 수 밖에 없었습니다.

> 😀 더 나은 방식이나 새로운 아이디어가 있다면 코드를 작성하여 Pull Request를 보내주시거나, 개발자가 아니시라면 [여기](https://zinirun.github.io/2020/09/07/project-dku-lms-downloader/)에 댓글을 달아주세요.