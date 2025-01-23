function init() {
  $(document).ready(function () {
      let bt = $('#to_top');
      const windowHeight = $(window).height();
      const documentHeight = $(document).height();
      if (documentHeight > windowHeight) {
          $(window).scroll(function () {
              let st = $(window).scrollTop();
              if (st > 30) {
                  bt.show();
              } else {
                  bt.hide();
              }
          });
          bt.click(function (event) {
              event.preventDefault();
              $('body,html').animate({
                  scrollTop: 0,
              }, 800);
          });
      } else {
          bt.hide();
      }
  });
}
function formatPostTimes() {
    document.querySelectorAll('.time,.ex-time').forEach(function(timeElement) {
        var date = new Date(timeElement.getAttribute('data-date'));
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = date.toLocaleDateString('en-US', options);
        timeElement.textContent = formattedDate;
    });
}
function initPageElements() {
  hljs.highlightAll();
  hljsln.initLineNumbersOnLoad();
  hljs.initCopyButtonOnLoad();
  const tocElement = document.querySelector('.toc');
  if (tocElement) {
      tocbot.init({
          tocSelector: '.toc',
          contentSelector: '.post-content',
          headingSelector: 'h1, h2, h3, h4, h5,h6',
          collapseDepth: 2,
          scrollSmooth: true,
          scrollSmoothDuration: 600,
          scrollSmoothOffset: -80,
          headingsOffset: 80,
          hasInnerContainers: true
      });
  }
  if (typeof ViewImage !== 'undefined' && ViewImage.init) {
      ViewImage.init('.post-content img,.moment-content img');
  }
  init();
}

function initLazyLoad() {
  jQuery('img.lazyload').on('load', function() {
      this.style.opacity = 1;
  }).lazyload();
}

function updateFooterYear() {
  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;
}

$(function() {
  init();
  initLazyLoad();
  updateFooterYear();
});

var pjax = new Pjax({
  selectors: ["#pjax-container", "title"],
  cacheBust: false,
  elements: "a",
});

let isPjaxLoading = false;
let hasContentLoaded = false;

document.addEventListener("pjax:send", function () {
  isPjaxLoading = true;
  NProgress.configure({
      showSpinner: false
  });
  NProgress.start(); 
});

document.addEventListener("pjax:complete", function () {
  isPjaxLoading = false;
  NProgress.done();
});

document.addEventListener("pjax:success", function () {
  initPageElements();
  initLazyLoad();
  updateFooterYear();
  const configStatus = document.getElementById('config-status');
    if (configStatus && configStatus.dataset.postTimeSet === 'open') {
        formatPostTimes();
    }
});


document.addEventListener('DOMContentLoaded', function () {
  if (!hasContentLoaded) {
      hasContentLoaded = true;
      initPageElements();
      const configStatus = document.getElementById('config-status');
        if (configStatus && configStatus.dataset.postTimeSet === 'open') {
            formatPostTimes();
        }
  }
});
