(function (w, d) {
    w.hljsln = {
        initLineNumbersOnLoad: initLineNumbersOnLoad,
        addLineNumbersForCode: addLineNumbersForCode
    };

    function initLineNumbersOnLoad() {
        if (d.readyState === 'interactive' || d.readyState === 'complete') {
            documentReady();
        } else {
            w.addEventListener('DOMContentLoaded', function () {
                documentReady();
            });
        }
    }

    function addLineNumbersForCode(html) {
        var num = 1;
        html = html.trim();
        var endsWithNewline = /\r\n|\r|\n$/.test(html);

        html = '<span class="ln-num" data-num="' + num + '"></span>' + html;
        html = html.replace(/\r\n|\r|\n/g, function (a) {
            num++;
            return a + '<span class="ln-num" data-num="' + num + '"></span>';
        });
        if (!endsWithNewline) {
            num--;
        }

        html = '<span class="ln-bg"></span>' + html;
        return html;
    }
    function documentReady() {
        var elements = d.querySelectorAll('pre code');
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].className.indexOf('hljsln') == -1) {
                var html = elements[i].innerHTML;
                html = addLineNumbersForCode(html);
                elements[i].innerHTML = html;
                elements[i].className += ' hljsln';
            }
        }
    }
})(window, document);
/*! highlightjs-copy-button v1.0.5 */
(function (i) {
    var h = "hljs-button",
        j = "hljs-ln-code",
        a = "复制",
        e = "错误",
        d = "已复制到剪贴板";

    String.prototype.format = String.prototype.f = function () {
        var l = arguments;
        return this.replace(/\{(\d+)\}/g, function (o, p) {
            return l[p] ? l[p] : o;
        });
    };

    if (typeof i.hljs === "undefined") {
        console.error("highlight.js not detected!");
    } else {
        i.hljs.initCopyButtonOnLoad = f;
        i.hljs.addCopyButton = k;
        i.hljs.copyCode = g;
        c();
    }

    function g(n) {
        var o = n.target || n.srcElement;
        if (o.className === h) {
            n.preventDefault();
            var l = document.getElementById("hljs-copy-el");
            if (!l) {
                l = document.createElement("textarea");
                l.style.position = "absolute";
                l.style.left = "-9999px";
                l.style.top = "0";
                l.id = "hljs-copy-el";
                document.body.appendChild(l);
            }
            l.textContent = n.currentTarget.innerText;
            l.select();
            try {
                var p = document.execCommand("copy");
                o.dataset.title = p ? d : e;
                if (p) {
                    setTimeout(function () {
                        o.dataset.title = a;
                    }, 2000);
                }
            } catch (m) {
                o.dataset.title = e;
            }
        }
    }

    function c() {
        var l = document.createElement("style");
        l.type = "text/css";
        l.innerHTML = [
            ".hljs{position: relative; overflow-x: auto;}",
            ".hljs-button{",
            "display: none;",
            "position: absolute;",
            "right: 10px;",
            "top: 10px;",
            "color: #abb2bf;",
            "background-color: #282c34;",
            "padding: 2px 10px;",
            "margin: 3px;",
            "border-radius: 5px;",
            "border: 1px solid #abb2bf;",
            "cursor: pointer;",
            "z-index: 10;",
            "}",
            ".hljs:hover .hljs-button{display: block;}",
            ".hljs-button:after{",
            "content: attr(data-title)",
            "}"
        ].join("");
        document.getElementsByTagName("head")[0].appendChild(l);
    }

    function f() {
        if (document.readyState === "complete") {
            b();
        } else {
            i.addEventListener("DOMContentLoaded", b);
        }
    }

    function b() {
        try {
            var n = document.querySelectorAll("code.hljs");
            for (var l = 0; l < n.length; l++) { 
                k(n[l]);
            }
        } catch (m) {
            console.error("CopyButton error: ", m);
        }
    }

    function k(l) {
        if (typeof l !== "object") {
            return;
        }
        l.innerHTML =
            l.innerHTML + '<div class="{0}" data-title="{1}"></div>'.format(h, a);
        l.setAttribute("onclick", "hljs.copyCode(event)");
    }
})(window);
  