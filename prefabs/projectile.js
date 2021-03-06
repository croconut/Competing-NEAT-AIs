let Projectile = function(game, scene, config) {
    let angle = Phaser.Math.Angle.Between(400, 300, config.destx, config.desty);
    console.log(config.destx, config.desty);
    let x0 = config.pcx + (Math.cos(angle) * 8);
    let y0 = config.pcy + (Math.sin(angle) * 8);
    if (!config.coords) {
        this._p = scene.physics.add.sprite(x0, y0, config.text, config.frame);
    }
    else {
        this._p = scene.add.polygon(x0, y0, config.coords, config.fill);
        scene.physics.world.enableBody(this._p, 0);
    }
    this._p.active = true;
    this._p.visible = true;
    this._p.isFilled = true;
    this._p.x0 = x0;
    this._p.y0 = y0;
    this._p.scale = config.scale;
    this._p.damage = config.damage;
    this._p.range = config.aRange;
    this._p.pierce = config.pierce;
    this._p.hit = false;
    this._p.body.velocity.x = (Math.cos(angle) * config.speed);
    this._p.body.velocity.y = (Math.sin(angle) * config.speed);
    this._p.setRotation(angle + (Math.PI/2));
    scene.pgroup.add(this._p);
    this._p.update = function() {
        if (Phaser.Math.Distance.Between(this.x0, this.y0, this.x, this.y) > this.range) {
            this.destroy();
        }
    }
}