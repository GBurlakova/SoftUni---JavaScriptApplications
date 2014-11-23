(function($) {
    var ARROW_COLLAPSED_PATH = 'url(\'images/arrow-collapsed.png\')';
    var ARROW_EXPANDED_PATH = 'url(\'images/arrow-expanded.png\')';

    $.fn.treeView = function () {
        var $this = $(this);
        traverseUL($this);
        return this;
    };

    function traverseUL(scope) {
        var $ul = $(scope);
        var listItems = $ul.children();
        if (listItems.length > 1) {
            $ul.css('list-style-type', 'none').css('list-style-image', ARROW_COLLAPSED_PATH);
            listItems.each(function () {
                var $currentListItem = $(this);
                var currentListItemSubitems = $currentListItem.children();
                if (currentListItemSubitems.length > 1) {
                    var $subitemTitle = $(currentListItemSubitems[0]);
                        $subitemTitle.attr('data-state', 'collapsed')
                            .on('click', processTreeItemClick);
                    var subitemUL = $(currentListItemSubitems[1]);
                    subitemUL.hide();
                    traverseUL(subitemUL);
                }
            });
        }
    }

    function processTreeItemClick() {
        var itemClicked = this;
        toggleState(itemClicked);
        toggleListStyleType(itemClicked);
        visualiseListItems(itemClicked);
    }

    function toggleState(scope) {
        var currentState = $(scope).attr('data-state');

        if (currentState === 'collapsed') {
            $(scope).attr('data-state', 'expanded');
        } else {
            $(scope).attr('data-state', 'collapsed');
        }
    }

    function toggleListStyleType(scope) {
        var currentState = $(scope).attr('data-state');

        if (currentState === 'collapsed') {
            $(scope).parent().css('list-style-type', 'none').css('list-style-image', ARROW_COLLAPSED_PATH);
        } else {
            $(scope).parent().css('list-style-type', 'none').css('list-style-image', ARROW_EXPANDED_PATH);
        }
    }

    function visualiseListItems(scope) {
        var $this = $(scope);
        var currentState = $this.attr('data-state');
        var children = $this.parent().find('ul:first');

        if (currentState === 'collapsed') {
            children.slideUp();
        } else if(currentState === 'expanded'){
            children.slideDown();
        }
    }
})(jQuery);
