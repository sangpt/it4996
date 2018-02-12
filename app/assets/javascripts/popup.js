$(document).on("page:change", function(event) {
  var $ = jQuery;

  var Popup = (function() {
    function Popup() {
      this.contents;
      this.$loading;
      this.childClass;
      this.init();
      console.log('init popup.js');
    }

    Popup.prototype.init = function() {
      this.enable();
      this.build();
    };

    Popup.prototype.enable = function() {
      var self = this;
      $("body").on("click", "a[data-popup], button[data-popup]", function(event) {
        self.contents = $(this).data("popup");
        self.class_name = $(this).data("class");
        self.start($(event.currentTarget));
        return false;
      });
    };

    Popup.prototype.build = function() {
      var isChild = (window.location != window.parent.location) ? true : false;
      this.childClass = (isChild) ? "popup-child" : "";

      var self = this;
      $("<div class='popup-overlay'></div><div class='popup-window" + " " + self.childClass + "'><p class='popup-content-size'></div>").appendTo($('body')).hide();
      this.$popup = $(".popup-window");
      this.$wrapperContent = $(".popup-content-size");
      this.$overlay = $(".popup-overlay");
      this.$loading = $("<div class='popup-loading'></div>")
      this.$close = $(".popup-close");
      this.$close.on("click", function() {
        self.end();
        return false;
      });

      this.$popup.find(".close").on("click", function() {
        self.end();
        return false;
      });
    };

    Popup.prototype.start = function($link) {
      var self = this;
      this.$popup.addClass(this.class_name);
      if(this.$content) this.$content.remove();
      this.$content = $("<iframe class='popup-content'></iframe>");
      this.$wrapperContent.append(this.$content);
      this.$content.attr("src",this.contents);

      // Fixbug: when preventDefault is setted, close popup will not active because isDefaultPrevented = false.
      $(".popup-close").remove();
      this.$wrapperContent.prepend("<p class='popup-close'></p>")
      this.$close = $(".popup-close");

      this.$close.on("click", function() {
        self.$close.trigger(e = $.Event("beforeClose.en.popup"));
        if (e.isDefaultPrevented()) {return;}
        if(self.$popup.hasClass("is-lastest-window")) {
          parent.$(".popup-content-size").resizable("enable").draggable("enable");
          self.end();
        }
        return false;
      });
      // End

      this.container = $link.prevAll('p');

      self.loading();
      this.$content.load(function(){
        self.sizeWindow();
        self.$loading.remove();
        // Add is-lastest-window class.
        parent.$(".is-lastest-window .popup-content-size").resizable("disable").draggable("disable");
        parent.$(".is-lastest-window").removeClass("is-lastest-window")
        self.$popup.addClass("is-lastest-window");
        self.$popup.find(".popup-content-size").resizable("enable").draggable("enable");
        // Add class for body when popup is opened
        $("body").addClass("popup-opened");
        self.sizeOverlay();
      });
    };

    Popup.prototype.sizeWindow = function() {
      this.$popup.show();
    };

    Popup.prototype.loading = function() {
      this.$popup.after(this.$loading)
    }

    Popup.prototype.sizeOverlay = function() {
      var self = this;
      self.$overlay
        .height($(document).height())
        .width($(document).width())
        .show();
      $(window).resize(function(){
        self.$overlay
          .height($(document).height())
          .width($(document).width())
      });
    };

    Popup.prototype.end = function() {
      var self = this;
      this.$popup.fadeOut(0, function() {
        $(this).removeClass(self.class_name);
        $(this).attr("class", "popup-window" + " " + self.childClass);
        $(this).css("height", "");
      });
      $(".popup-loading").remove();
      parent.$(".popup-window").addClass("is-lastest-window");
      parent.$(".popup-content-size").resizable("enable").draggable("enable");
      this.$overlay.hide();
      $("body").removeClass("popup-opened");
      $(".popup-content-size, .ui-draggable").removeAttr("style");
    };

    return Popup;

  })();

  $(function() {
    var popup = new Popup();
  });
  // resize-popup and draggable-popup
  $("<div class='popup-wrap'>").appendTo("body");
  $(".popup-content-size").draggable({
    handle: "",
    cursor: "move",
    containment: ".popup-wrap",
    scroll: false
  }).resizable({
    minHeight: 85,
    minWidth: 85
  });
  //end resize-popup and draggable-popup
  var lastScrollLeft = 0;
  var xOffset = 8;
  $(window).scroll(function() {
    var documentScrollLeft = $(document).scrollLeft();
    if(lastScrollLeft != documentScrollLeft && documentScrollLeft>= xOffset) {
      parent.$(".popup-close").hide();
      lastScrollLeft = documentScrollLeft;
    }else {
      parent.$(".popup-close").show();
    }
  });
});
