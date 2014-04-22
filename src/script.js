(function() {
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
		
		$top.find('td[class!="timeline"], .timeline span').tooltip({
			placement:'right',
			trigger: 'hover',
			html:true,
			container:$table.parent()
		});
		
		
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
					console.log(this);
					console.log(arguments);
					var _a = a.split('\n')[4].split(' ')[1].split('?')[0].split('#')[0],
						_b = b.split('\n')[4].split(' ')[1].split('?')[0].split('#')[0];
						
					if(_a < _b)
						return -1;
					else if(_a > _b)
						return 1;
					else
						return 0;
				},
				size:function(a, b) {
					var _a = parseFloat(a.replace(',','.')),
						_b = parseFloat(b.replace(',','.'));
					
					return _a - _b;
					
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