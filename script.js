(function() {
	var addInteraction = function() {
		
		if(typeof jQuery == 'undefined' || !jQuery('.inside').length)
			return waiting();
		
		var $ = jQuery,
			$table = $('.har-table'),
			$inside = $table.find('.inside'),
			$nav = $inside.find('.nav'),
			$top = $table.find('.top'),
			$tempo = $top.find('.tempo'),
			$div = $inside.find('div'),
			tableWidth;
		
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
				$parent = $this.parent();
			
			$parent.parent().find('.active').removeClass('active');
			$parent.addClass('active');
			
			
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
				$next = $this.next();
			
			if($this.hasClass('opened')) {
				$this.removeClass('opened');
				$next.addClass('hidden');
			}
			else {
				$this.addClass('opened');
				$next.removeClass('hidden');
			}
			$i.get(0).className = toggleClass;
			$i.data('toggle-sign', classname);
			return false;
		});
		
		$top.find('td[class!="tempo"], .tempo span').tooltip({
			placement:'right',
			trigger: 'hover',
			html:true,
			container:$table.parent()
		});
		
		
		for(var i=0, ilen=$tempo.length, half=ilen/2;i<ilen;i++)
			$tempo.eq(i).data('placement', i<half?'bottom':'top');
		
		$tempo.popover({
			html:true,
			trigger:'hover',
			container:$table.parent()
		});
		
	};
	

	var waiting = function() {
		if(typeof jQuery == 'undefined' || !jQuery('.inside').length)
			return setTimeout(waiting, 500);
		
		jQuery(addInteraction);
	};
	if(document.getElementById('harParser')) {
		waiting();
	}
	window.addInteraction = addInteraction;
})();