(function() {
	'use strict';
	var addInteraction = function() {
		
		if(typeof jQuery == 'undefined' || !jQuery('.inside').length)
			return waiting();
		
		var $ = jQuery,
			$table = $('.har-table'),
			$inside = $table.find('.inside'),
			$nav = $inside.find('.nav'),
			$top = $table.find('.top'),
			$timeline = $top.find('.timeline'),
			$div = $inside.find('div'),
			tooltipOpt = {
				placement:'right',
				trigger: 'hover',
				html:true,
				container:$table.parent()
			},
			tableWidth, i, ilen, half;
		
		$div.hide();
		tableWidth = $table.width();
		$div.show();
		
		$inside.find('dt').css('width', 'auto').each(function() {
			var $this = $(this);
			if($this.width() > 160)
				$this.attr('title', $this.text());
		}).css('width', '').end().addClass('hidden');
		
		
		
		$div.css('width', tableWidth - 10).end().each(function() {
			var $div = $(this).find('div');
			for(var i=1,ilen=$div.length;i<ilen;i++) {
				$div.eq(i).addClass('hidden');
			}
		});
			
			
		$nav.find('a').click(function() {
			
			var $this = $(this),
				$inside = $this.parents('.inside'),
				$div = $inside.find('div');
			
			$inside.find('.active').removeClass('active');
			$this.parent().addClass('active');
			
			
			$div.addClass('hidden');
			$div.filter('.' + $this.attr('href').substr(1)).removeClass('hidden');
			
			
			return false;
		});
		
		
		
		$nav.find('li:first-child').addClass('active');
		
		$top.click(function() {
			var $this = $(this),
				$i = $this.find('i'),
				classname = $i.get(0).className,
				toggleClass = $i.data('toggle-sign'),
				$next = $('#inside-' + $this.attr('id').substr(4));
			
			
			
			
			if($this.hasClass('opened')) {
				$this.removeClass('opened');
				$next.addClass('hidden');
			}
			else {
				
				if($this.next() != $next)
					$this.after($next);
				
				$this.addClass('opened');
				$next.removeClass('hidden');
			}
			$i.get(0).className = toggleClass;
			$i.data('toggle-sign', classname);
			return false;
		});
		
		$top.each(function() {
			var $this = $(this),
				$bars = $this.find('.progress-bar'),
				$totalTime = $this.find('.totalTime'),
				left = 0,
				marginLeft = 0;
			
			for(var i=0, ilen=$bars.length;i<ilen;i++) {
				left += parseFloat($bars.eq(i).attr('style').replace('width:', ''));
			}
			
			if(left > 80) {
				for(i=1;i<ilen;i++) {
					marginLeft += parseFloat($bars.eq(i).css('width'));
				}
				marginLeft += $totalTime.width() + 5;
				$totalTime.css('marginLeft', marginLeft * -1);
			}
			
			$totalTime.css('left', (left + 0.5) + '%');
			
		});
		
		$top.find('td.size, .timeline span.domloaded').tooltip(tooltipOpt);
		tooltipOpt.placement = 'left';
		$top.find('td.status, td.type, .timeline span.windowloaded').tooltip(tooltipOpt);
		
		
		if($timeline.length > 15) {
			for(i=0, ilen=$timeline.length, half=ilen/2;i<ilen;i++)
				$timeline.eq(i).data('placement', i<half?'bottom':'top');
		}
		else {
			for(i=0, ilen=$timeline.length;i<ilen;i++)
				$timeline.eq(i).data('placement', 'bottom');
		}
		
		$timeline.popover({
			html:true,
			trigger:'hover',
			container:$table.parent()
		});
		
		if($table.stupidtable) {
			$table.stupidtable({
				url:function(a, b) {
					a = a.split('\n')[5].replace(/^\s*/g, '').split('?')[0].split('#')[0];
					b = b.split('\n')[5].replace(/^\s*/g, '').split('?')[0].split('#')[0];
						
					if(a < b)
						return -1;
					else if(a > b)
						return 1;
					else
						return 0;
				},
				size:function(a, b) {
					a = parseFloat(a.replace(',','.'));
					b = parseFloat(b.replace(',','.'));
					
					return a - b;
					
				},
				timeline:function(a, b) {
					
					a = parseInt(a.split('\n')[3].replace(/^\s*/g, ''),10);
					b = parseInt(b.split('\n')[3].replace(/^\s*/g, ''),10);
					
					return b - a;
				}
			});
			$table.bind('beforetablesort', function() {
				$('tr.top.opened').click();
				$('.loader').show();
			});
			$table.bind('aftertablesort', function() {
				$('.loader').hide();
			});
		}
		
		$('.loader').hide();
		
	};
	

	var waiting = function() {
		if(typeof jQuery == 'undefined' || !jQuery('.inside').length)
			return setTimeout(waiting, 500);
		
		jQuery(addInteraction);
	};
	if(!document.getElementById('harParser')) {
		var div = document.createElement('div');
		div.className = 'loader';
		document.body.appendChild(div);
		waiting();
	}
	window.addInteraction = addInteraction;
})();