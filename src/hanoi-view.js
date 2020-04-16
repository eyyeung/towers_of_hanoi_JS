class View {
    constructor(game,$el){
        this.game = game;
        this.$el = $el;
        // want to have this to check if the user clicked the start or end pole
        this.startPole = null;

        // put a handler on the ul element and bind it -> callback is the clickTower function
        this.$el.on('click','ul',this.clickTower.bind(this));

        this.setupTowers();
        this.render();
    }

    clickTower(event) {
        const clickedIdx = $(event.currentTarget).data("pole")
        // if user hasn't click the start pole then set it
        if (this.startPole===null){
            this.startPole = clickedIdx;
            // otherwise, set the end pole and move the pole
        } else {
            if (!this.game.move(this.startPole, clickedIdx)){
                alert('Invalid move!')
            }
            this.startPole = null;
        }

        // call the render to show the changes
        this.render();

        if (this.game.isWon()) {
            this.render();
            // turn off the handler
            this.$el.off('click');
            //signal game over
            alert('Good job!');
        }
    }

    render($ePole){
        const $towers = this.$el.find('ul');
        $towers.removeClass();
        if (this.startPole !==null) {
            $towers.eq(this.startPole).addClass('clicked');
        }
        
        this.game.towers.forEach((disks,poleIdx)=>{
            const $disk = $towers.eq(poleIdx).children();
            $disk.removeClass();

            disks.forEach((size,diskIdx)=>{
                $disk.eq(-1 * (diskIdx+1)).addClass(`disk_${size}`);
            });
        });
    }

    // want to setup the initial states of the three piles on the left pole
    setupTowers(){
        for (let poleIdx=0;poleIdx<3;poleIdx++){

            const $ul = $("<ul>");
            $ul.data("pole",[poleIdx]);

            for (let pileIdx=3;pileIdx>0;pileIdx--){
                let $li = $("<li>");
                $li.data("size",[pileIdx]);
                $ul.append($li);
                this.$el.append($("text"));
            }
            this.$el.append($ul);
        }
    }

}

module.exports = View;