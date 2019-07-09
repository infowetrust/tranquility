		// using d3 for convenience
		var main = d3.select('main')
		var scrolly = main.select('#scrolly');
		var figure = scrolly.select('figure');
        var article = scrolly.select('article');
        var step = article.selectAll('.step');

        // initialize the scrollama
        var scroller = scrollama();

		// generic window resize listener event
		function handleResize() {
            // 1. update height and width of step elements
            var ratio = 5/8; //breakeven point for 40% figur max height
            var figureHeight = window.innerHeight / 4; //pic w/h = 4
            var figureWidth = window.innerWidth;
            
            var windowRatio = window.innerHeight / window.innerWidth;
            if (windowRatio <= ratio) {
                figureHeight = window.innerHeight / 2.5;
                figureWidth = window.innerHeight * 1.6;
                } else {
                    figureHeight = window.innerWidth / 4;
                    figureWidth = window.innerWidth;
                }
            
            var figureMarginTop = (window.innerHeight - figureHeight);
            var marginDifference = (window.innerWidth - figureWidth)
            var figureMarginLeft = marginDifference / 2;

			figure
                .style('height', figureHeight + 'px')
                .style('width', figureWidth + 'px')
                .style('top', figureMarginTop + 'px')
                .style('left', figureMarginLeft + 'px');

			// 3. tell scrollama to update new element dimensions
			scroller.resize();
        }


        //when you start or end a touch, turn the class hover_effect on or off.
        //https://stackoverflow.com/a/2891155
        $(document).ready(function() {
            $('.hover').on('touchstart touchend', function(e) {
                e.preventDefault();
                $(this).toggleClass('hover_effect');
            });
        });

        // scrollama event handlers

        function handleStepEnter(response) {

			step.classed('is-active', function (d, i) {
				return i === response.index;
			})

			// update graphic based on step
            figure.select('p').text(response.index + 1);
            
            //update time based on step
            var times = [
                ["00:00","2:32"],
                ["00:00","02:32"],
                ["00:16","02:16"],
                ["00:27","02:05"],
                ["00:34","01:58"],
                ["00:35","01:57"],
                ["00:49","01:43"],
                ["00:51","01:41"],
                ["00:54","01:38"],
                ["01:01","01:31"],
                ["01:06","01:26"],
                ["01:09","01:23"],
                ["01:24","01:08"],
                ["01:45","00:47"],
                ["01:50","00:42"],
                ["01:55","00:37"],
                ["02:02","00:30"],
                ["02:04","00:28"],
                ["02:08","00:24"],
                ["02:12","00:20"],
                ["02:30","00:02"],
                ["02:32","00:00"],
                ["02:32","00:00"]
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
            
            if (response.index >= 1 && response.index <22 ) {
                header.style.opacity = 1;
                } else {
                header.style.opacity = 0;
            }

            //CAPCOM header
            var headerhouston = document.getElementById("houston");

            if (response.index > 6 && response.index < 9 || response.index > 9 && response.index < 21  ) {
                headerhouston.style.opacity = 1;
                } else {
                headerhouston.style.opacity = 0;
            }
            //MIKE header
            var headercollins = document.getElementById("collins");

            if (response.index == 9 ) {
                headercollins.style.opacity = 1;
                } else {
                headercollins.style.opacity = 0;
            }

            //hide and show footer times
            var clock = document.getElementById("time");
            
            if (response.index >= 1 && response.index <22 ) {
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