$(document).ready(function() {
(function($) {
  $.fn.crossslider = function(options) {
    var slider = $(this);

    var settings = $.extend(
      {
        duration: 1000, //Duration of animation in miliseconds.
        containerWidth: 1450, //container width to add max-width for content in slides.

        //List of slider elements:
        left_half: ".left-half",
        right_half: ".right-half",
        content: ".slide-content",
        slides: ".slide",

        //Navigation elements:
        next_button: ".next-slide",
        prev_button: ".prev-slide",

        //CSS Classes
        active_slide: 'active',
        disabled_nav: 'disabled',
      },
      options
    );

    $(settings.slides).each(function(index) {
      $(this).css({ "z-index": index });
    });

    //List of elements:
    var left_half = $(settings.left_half);
    var right_half = $(settings.right_half);
    var content = $(settings.content);

    //check support for Clip Path property
    if (!areClipPathShapesSupported()) {
      $(left_half).css({ width: "50%" });
      $(right_half).css({ width: "50%" });
    }

    function setContentWidth() {
      if ($(window).width() > settings.containerWidth) {
        var offset = ($(window).width() - settings.containerWidth) / 2;
      } else {
        var offset = 0;
      }
      $(left_half).find(content).css({ left: offset + "px" });
      $(right_half).find(content).css({ right: offset + "px" });
    }

    setContentWidth();
    $(window).on("resize", setContentWidth);

    //Add active class on first slide.
    $(settings.slides).first().addClass(settings.active_slide);

    if($(settings.slides).length > 1) {
      $(settings.prev_button).addClass(settings.disabled_nav);
    } else {
      $(settings.prev_button).addClass(settings.disabled_nav);
      $(settings.next_button).addClass(settings.disabled_nav);
    }

    //show first slide on page load.
    slideIn();

    function slideIn() {
      //animate slide in for current slide
      $(slider).find("."+settings.active_slide).find(left_half).animate(
        {
          left: "0%"
        },
        settings.duration
      );
      $(slider).find("."+settings.active_slide).find(right_half).animate(
        {
          right: "0%"
        },
        settings.duration
      );

      //fadeout and scale down previous slide
      if ($(slider).find("."+settings.active_slide).prev(settings.slides).length > 0) {
        $(slider).find("."+settings.active_slide).prev(settings.slides).css({
          transform: "scale(.75)",
          opacity: "0"
        });
      }

      //activate "Prev Slide" link
      if ($(slider).find("."+settings.active_slide).prev(settings.slides).length > 0) {
        $(settings.prev_button).removeClass(settings.disabled_nav);
      }

      //deactivate "Next Slide" link when last slide is reached
      if ($(slider).find("."+settings.active_slide).next(settings.slides).length == 0) {
        $(settings.next_button).addClass(settings.disabled_nav);
      }
    }

    function slideOut() {
      //fadein and scale up previous slide
      $(slider).find("."+settings.active_slide).prev(settings.slides).css({
        transform: "scale(1)",
        opacity: "1"
      });

      //animate slide our for current slide
      $(slider).find("."+settings.active_slide).find(left_half).animate(
        {
          left: "-61%"
        },
        settings.duration
      );
      $(slider).find("."+settings.active_slide).find(right_half).animate(
        {
          right: "-61%"
        },
        settings.duration
      );

      //activate "Next Slide" link
      $(settings.next_button).removeClass(settings.disabled_nav);

      //deactivate "Prev Slide" link when first slide is reached
      if ($(slider).find("."+settings.active_slide).prev(settings.slides).length == 0) {
        $(settings.prev_button).addClass(settings.disabled_nav);
      }
    }

    $(settings.next_button).on("click", function(e) {
      e.preventDefault();
      var el = $("."+settings.active_slide);
      if (el.next(settings.slides).length > 0) {
        el.removeClass(settings.active_slide);
        el.next(settings.slides).addClass(settings.active_slide);
      }
      slideIn();
    });

    $(settings.prev_button).on("click", function(e) {
      e.preventDefault();
      var el = $("."+settings.active_slide);

      if (el.prev(settings.slides).length > 0) {
        slideOut();
        el.removeClass(settings.active_slide);
        el.prev(settings.slides).addClass(settings.active_slide);
      }

      //deactivate "Prev Slide" link when first slide is reached
      if ($("."+settings.active_slide).prev(settings.slides).length == 0) {
        $(this).addClass(settings.disabled_nav);
      }
    });

    //function to detect support for Clip Path property
    function areClipPathShapesSupported() {
      var base = "clipPath",
        prefixes = ["webkit", "moz", "ms", "o"],
        properties = [base],
        testElement = document.createElement("testelement"),
        attribute = "polygon(50% 0%, 0% 100%, 100% 100%)";

      // Push the prefixed properties into the array of properties.
      for (var i = 0, l = prefixes.length; i < l; i++) {
        var prefixedProperty =
          prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1); // remember to capitalize!
        properties.push(prefixedProperty);
      }

      // Interate over the properties and see if they pass two tests.
      for (var i = 0, l = properties.length; i < l; i++) {
        var property = properties[i];

        // First, they need to even support clip-path (IE <= 11 does not)...
        if (testElement.style[property] === "") {
          // Second, we need to see what happens when we try to create a CSS shape...
          testElement.style[property] = attribute;
          if (testElement.style[property] !== "") {
            return true;
          }
        }
      }

      return false;
    }

    return this;
  };
})(jQuery);


});








// // Card Slider
// $(document).ready(function() {
//   $("#carouselExampleControls").carousel({
//     interval: 3000 // Adjust the interval as needed
//   });
// });

// // Cross Slider
// (function($) {
//   $.fn.crossslider = function(options) {
//     // Your crossslider code here
//     // Ensure that this code doesn't interfere with the card slider
//   };
// })(jQuery);

// Card Slider
// Card Slider
// $(document).ready(function() {
//   var carousel = $("#carouselExampleControls");

//   carousel.carousel({
//     interval: 3000 // Adjust the interval as needed
//   });

//   function slideNext() {
//     carousel.carousel('next');
//   }

//   //setInterval(slideNext, 3000); // Adjust the interval as needed

//   carousel.on('slid.bs.carousel', function () {
//     if (carousel.find('.carousel-inner .carousel-item.active').index() === carousel.find('.carousel-inner .carousel-item').length - 1) {
//       carousel.carousel(0); // Go back to the first item if at the end
//     }
//   });
// });
// ---------------------------------------

const data = [
  {
    id: 1,
    name: "ساعة رجالية باللون الفضي والأخضر شبيهة رولكس",
    img: "images/wa (1).jpeg",
    amt:"﷼127",
  },
  {
    id: 2,
    name: "ساعة رجالية شبيهة  باللون الفضي والكحلي",
    img: "images/wa (2).jpeg",
    amt:"127﷼",
   
    color: "Naviblue",
  },
  {
    id: 3,
    name: " ساعة رجالية شبيهة  باللون  الذهبي والفضي والكحلي",
    
    img:"images/wa (3).jpeg",
    amt:"127﷼",
   
    color: "Naviblue",
  },
  {
    id: 4,
    name: " ساعة رجالية شبيهة  باللون   الاسود والذهبي والفضي والكحلي",
    img: "images/wa (12).jpeg",
    amt:"127﷼",
  
    color: "Naviblue",
  },
  {
    id: 5,
    name: " ساعة رجالية شبيهة  باللون   الاسود والذهبي والفضي والكحلي",
    img: "images/wa (11).jpeg",
    amt:"127﷼",
    
    color: "Naviblue",
  },
  {
    id: 6,
    name: " ساعة رجالية شبيهة  باللون   الاسود والذهبي والفضي والكحلي",
    img: "images/wa (6).jpeg",
    amt:"127﷼",
    
    color: "Naviblue",
  },
  {
    id: 7,
    name: " ساعة رجالية شبيهة  باللون   الاسود والذهبي والفضي والكحلي",
    img: "images/wa (7).jpeg",
    amt:"127﷼",
  
    color: "Naviblue",
  },
  {
    id: 8,
    name: " ساعة رجالية شبيهة  باللون   الاسود والذهبي والفضي والكحلي",
    img: "images/wa (8).jpeg",
    amt:"127﷼",
    
    color: "Naviblue",
  },
  {
    id: 9,
    name: " ساعة رجالية شبيهة  باللون   الاسود والذهبي والفضي والكحلي",
    img: "images/wa (9).jpeg",
    amt:"127﷼",
    color: "Naviblue",
  },
  
];

// Function to create product cards
function createProductCard(product) {
  return `
    <div class="swiper-slide">
      <div class="card">
        <div class="imgBx">
          <img src="${product.img}" alt="${product.name}" />
        </div>
        <div class="contentBx">
          <h2 style="font-size: 16px;">${product.name}</h2>
          <h2 style="font-size: 18px;">${product.amt}</h2>
          <div class="size">
            <h3>المقاس :</h3>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
          <div class="color">
            <h3>الالوان :</h3>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <a href="#">  عرض التفاصيل</a>
        </div>
      </div>
    </div>`;
}


function displayProducts(products) {
  const productCardsContainer = document.getElementById('productCards');
  productCardsContainer.innerHTML = products.map(createProductCard).join('');
}

// Display products
displayProducts(data);




  //   <div class="card">
  //   <div class="imgBx">
  //     <img src="http://pngimg.com/uploads/running_shoes/running_shoes_PNG5782.png" alt="nike-air-shoe">
  //   </div>
  //   <div class="contentBx">
  //     <h2>Nike Shoes</h2>
  //     <div class="size">
  //       <h3>Size :</h3>
  //       <span>7</span>
  //       <span>8</span>
  //       <span>9</span>
  //       <span>10</span>
  //     </div>
    
  //   </div>
  // </div>

//   productsContainer.innerHTML = productDetails;

//   // Add a click event listener to each product container
//   const productContainers = document.querySelectorAll(".product");
//   productContainers.forEach((productContainer) => {
//     productContainer.addEventListener("click", function () {
//       const productId = parseInt(productContainer.dataset.productId);
//       navigateToDetails(productId);
//     });
//   });


// displayProducts(data);


$(window).ready(function () {
  let sectionTwo = $("#sec3").offset().top;
  

  
  
  
   
     //arrow        
  $(window).scroll(() => {
       if (sectionTwo < $(window).scrollTop()) {
          $(".arrow_up").fadeIn(1000);
      }
      if($(window).scrollTop() == 0){
          $(".arrow_up").fadeOut(1000); 
      }
     
    });
    
      
  $(".arrow_up").click(() => {
     $("html ,body").animate({ scrollTop:0},2000);
 })
  }


);


function openWhatsApp() {
  // Recipient's phone number
  var phoneNumber = '+967774254881'; // Replace this with the recipient's actual phone number

  // Message you want to send
  var message = encodeURIComponent('السلام عليكم كم سعر التوصيل ؟');

  // Create the WhatsApp share link with both phone number and message
  var whatsappLink = 'https://wa.me/' + phoneNumber + '?text=' + message;

  // Open the WhatsApp link in a new tab
  window.open(whatsappLink, '_blank');
}

  