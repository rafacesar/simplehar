$(function($) {
	var waiting = function() {
		if(!$('.inside').length)
			return setTimeout(waiting, 1000);
		
		
		$('.inside').find('dt').css('width', 'auto').each(function() {
			var $this = $(this);
			if($this.width() > 160)
				$this.attr('title', $this.text());
		}).css('width', '').end().addClass('hidden');
		
		var width = $('.table').width();
		
		$('.inside').find('div').css('width', width - 10).end().each(function() {
			var $div = $(this).find('div');
			for(var i=1,ilen=$div.length;i<ilen;i++) {
				$div.eq(i).addClass('hidden');
			}
		});
		
		
		$('.inside').find('.nav').find('a').click(function() {
			
			var $this = $(this);
			
			$this.parent().parent().find('.active').removeClass('active');
			$this.parent().addClass('active');
			
			
			$this.parents('.inside').find('div').addClass('hidden');
			$this.parents('.inside').find('div.' + $this.attr('href').substr(1)).removeClass('hidden');
			
			
			return false;
		});
		
		
		
		$('.inside .nav li:first-child').addClass('active');
		
		$('.top').click(function() {
			var $this = $(this),
				classname = $this.find('i').get(0).className,
				toggleClass = $this.find('i').data('toggle-sign');
			if($this.hasClass('opened')) {
				$this.removeClass('opened');
				$this.next().addClass('hidden');
			}
			else {
				$this.addClass('opened');
				$this.next().removeClass('hidden');
			}
			$this.find('i').get(0).className = toggleClass;
			$this.find('i').data('toggle-sign', classname);
			return false;
		});
		
		$('.top td').tooltip({
			placement:'right',
			trigger: 'hover',
			html:true,
			container:$('table').parent()
		});
		
		$('.top .tempo').popover({
			html:true,
			trigger:'hover',
			placement:'bottom', //TODO: adjust position for the lasts lines
			container:$('table').parent()
		});
		
	};
	waiting();
});