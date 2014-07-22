(function() {
	'use strict';
	var addInteraction = function() {
		
		if(typeof jQuery === 'undefined' || !jQuery('.inside').length)
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
		
		
		var $dt = $inside.find('dt'), $_dt, _dtLength;
		
		ilen = $dt.length;
		while(ilen--) {
			$_dt = $dt[ilen];
			_dtLength = $_dt.textContent.length;
			if(_dtLength > 18) {
				//if($_dt.clientWidth > 160)
				$_dt.title = $_dt.textContent;
			}
		}
		
		
		$inside.addClass('hidden');
		
		$div.css('width', tableWidth - 10).end().each(function() {
			var $div = $(this).find('div');
			for(var i=1,ilen=$div.length;i<ilen;i++) {
				$div.eq(i).addClass('hidden');
			}
		});
		
		$nav.on('click', 'a', function() {
			
			
			var $this = $(this),
				$inside = $this.parents('.inside'),
				$div = $inside.find('div');
			
			$inside.find('.active').removeClass('active');
			$this.parent().addClass('active');
			
			
			$div.addClass('hidden');
			$div.filter('.' + $this.attr('href').substr(1)).removeClass('hidden');
			
			
			return false;
		});
		
		$top.find('.url > div > a').click(function(evt) {
			if(evt.which === 2)
				evt.stopPropagation();
			else {
				$(this).parents('tr.top').click();
				return false;
			}
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
				
				if($this.next() !== $next)
					$this.after($next);
				
				$this.addClass('opened');
				$next.removeClass('hidden');
			}
			$i.get(0).className = toggleClass;
			$i.data('toggle-sign', classname);
			return false;
		});
		
		var $_top, $_bars, $_totalTime, _left, __left, _marginLeft, _space, j, jlen;
		ilen = $top.length;
		while(ilen--) {
			$_top = $top.eq(ilen);
			$_bars = $_top.find('div.progress-bar');
			$_totalTime = $_top.find('span.totalTime');
			_left = 0;
			_marginLeft = 0;
			_space = $_bars.siblings('.progress-bar-space').width();
			
			j = jlen = $_bars.length;
			
			while(j--) {
				__left = parseFloat($_bars.eq(j).attr('style').replace('width:', ''));
				if(__left > 0)
					_left += __left;
			}
			
			console.log(_left);
			
			if(_left > 80) {
				if(_space > 10) {
					for(j=1;j<jlen;j++)
						_marginLeft += parseFloat($_bars.eq(j).width());
					
					_marginLeft += $_totalTime.width() + 5;
					$_totalTime.css('marginLeft', _marginLeft * -1);
					console.log('teste');
				}
				else {
					_left = 0;
					console.log('testa');
					$_totalTime.css('font-weight', 'bold');
				}
			}
			
			$_totalTime.css('left', (_left + 0.5) + '%');
			
		}
		
		var $_timeline = $top.find('.timeline');
		$top
			.find('td.size')
				.add($_timeline.find('span.domloaded'))
				.add($_timeline.find('span.renderstarted'))
				.tooltip(tooltipOpt);
		tooltipOpt.placement = 'left';
		$top
			.find('td.status, td.type')
				.add($_timeline.find('span.windowloaded'))
				.tooltip(tooltipOpt);
		
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
		if(typeof jQuery === 'undefined' || !jQuery('.inside').length)
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