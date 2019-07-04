		// using d3 for convenience
		var main = d3.select('main')
		var scrolly = main.select('#scrolly');
		var figure = scrolly.select('figure');
		var article = scrolly.select('article');
        var step = article.selectAll('.step');
        var figureHeight = window.innerWidth / 4;

        // initialize the scrollama
		var scroller = scrollama();

		// generic window resize listener event
		function handleResize() {
            // 1. update height of step elements
            //TK need to update this to length of text
			//var stepH = Math.floor(window.innerWidth * 0.75);
			//step.style('height', stepH + 'px');
 
            var figureMarginTop = (window.innerHeight - figureHeight);

			figure
				.style('height', figureHeight + 'px')
				.style('top', figureMarginTop + 'px');

			// 3. tell scrollama to update new element dimensions
			scroller.resize();
        }
        
        //when you start or end a touch, turn the class hover_effect on or off.
        //https://stackoverflow.com/a/2891155
        /*($(document).ready(function() {
            $('.hover').on('touchstart touchend', function(e) {
                e.preventDefault();
                $(this).toggleClass('hover_effect');
            });
        });*/

        // scrollama event handlers

        function handleStepEnter(response) {
			console.log(response)
			// response = { element, direction, index }

			// add color to current step only
			step.classed('is-active', function (d, i) {
				return i === response.index;
			})

			// update graphic based on step
            figure.select('p').text(response.index + 1);
            
            //update time based on step
            var times = [
                ["0:00","2:32"],
                ["0:00","2:32"],
                ["0:16","2:16"],
                ["0:27","2:05"],
                ["0:34","1:58"],
                ["0:35","1:57"],
                ["0:49","1:43"],
                ["0:51","1:41"],
                ["0:54","1:38"],
                ["1:01","1:31"],
                ["1:24","1:08"],
                ["1:50","0:42"],
                ["1:55","0:37"],
                ["2:04","0:28"],
                ["2:08","0:24"],
                ["2:12","0:20"],
                ["2:30","0:02"],
                ["2:32","0:00"],
                ["2:32","0:00"]
                ];

            document.getElementById("timel").textContent= times[response.index][0];

            document.getElementById("timer").textContent= times[response.index][1];

            //update moon image
            document.getElementById('moon').src = ("media/Moon-" + response.index + ".jpg");

            //make command module fly
            var element = document.getElementById("orbit");
            
            if (response.index == 9) {
                element.classList.add("slideLeft");
                } else {
                element.classList.remove("slideLeft");
            }

            //hide and show header names
            var header = document.getElementById("labels");
            
            if (response.index >= 1 && response.index <18 ) {
                header.style.opacity = 1;
                } else {
                header.style.opacity = 0;
            }

            var headercollins = document.getElementById("collins");

            if (response.index == 9 ) {
                headercollins.style.opacity = 1;
                } else {
                headercollins.style.opacity = 0;
            }

            //hide and show footer times
            var clock = document.getElementById("time");
            
            if (response.index >= 1 && response.index <18 ) {
                clock.style.opacity = 1;
                } else {
                clock.style.opacity = 0;
            }
		}

		function setupStickyfill() {
			d3.selectAll('.sticky').each(function () {
				Stickyfill.add(this);
			});
		}

		function init() {
			setupStickyfill();
			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options
			// 		this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller.setup({
				step: '#scrolly article .step',
				offset: .25, //trigger line
 				debug: true,
			})
				.onStepEnter(handleStepEnter)


			// setup resize event
			window.addEventListener('resize', handleResize);
		}

		// kick things off
		init();