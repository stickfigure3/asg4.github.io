const Brown      = [128, 77, 26, 255];
const DarkBrown  = [77, 51, 26, 255];
const White      = [255, 255, 255, 255];
const Black      = [0, 0, 0, 255];


class Dog {
    constructor() {
        this.type = "dog";
        this.bodyMatrix = null;
        this.headMatrix = null;
        this.defaultTextureNum = -2;

        // Body parts
        this.body = null;
        this.underBody = null;
        this.head = null;
        this.tail = null;

        // Face features
        this.outerEye = null;
        this.innerEye = null;
        this.nose = null;
        this.earLeft = null;
        this.earRight = null;

        // Legs
        this.femur = null;
        this.tibia = null;
        this.foot = null;
    }

    generateCubes() {
        // Body
        this.body = new Cube();
        this.underBody = new Cube();

        // Head
        this.head = new Cube();
        this.tail = new Cube();

        // Facial features
        this.outerEye = new Cube();
        this.innerEye = new Cube();
        this.nose = new Cube();
        this.earLeft = new Cube();
        this.earRight = new Cube();

        // Legs
        this.femur = new Cube();
        this.tibia = new Cube();
        this.foot = new Cube();
    }

    translate(x, y, z) {
        if (this.body == null) {
            this.generateCubes();
        }
        this.body.matrix.setTranslate(x, y, z);
    }

    drawEyes(position) {
        // Outer eye
        this.outerEye.color = White;
        this.outerEye.textureNum = normalOn ? -3 : this.defaultTextureNum;
        this.outerEye.matrix = new Matrix4(this.headMatrix);
        this.outerEye.matrix.translate(position[0], position[1], position[2]);
        let outerEyeMatrix = new Matrix4(this.outerEye.matrix);
        this.outerEye.matrix.scale(0.1, 0.1, 0.1);
        this.outerEye.render();

        // Inner eye (pupil)
        this.innerEye.color = Black;
        this.innerEye.textureNum = normalOn ? -3 : this.defaultTextureNum;
        this.innerEye.matrix = new Matrix4(outerEyeMatrix);
        this.innerEye.matrix.translate(-0.025, 0.025, 0.025);
        this.innerEye.matrix.scale(0.05, 0.05, 0.05);
        this.innerEye.render();
    }

    drawBody() {
        this.body.color = Brown;
        this.body.textureNum = normalOn ? -3 : this.defaultTextureNum;
        this.body.matrix.translate(-0.1, -0.2, 0.0);
        this.body.matrix.rotate(bodyJoint, 0, 0, 1);
        this.bodyMatrix = new Matrix4(this.body.matrix);
        this.body.matrix.scale(1.2, 0.3, 0.6);
        this.body.render();

        this.underBody.color = DarkBrown;
        this.underBody.textureNum = normalOn ? -3 : this.defaultTextureNum;
        this.underBody.matrix = new Matrix4(this.bodyMatrix);
        this.underBody.matrix.translate(-0.1, -0.15, 0.0);
        this.underBody.matrix.scale(1.2, 0.1, 0.6);
        this.underBody.render();
    }

    drawHead() {
        this.head.color = Brown;
        this.head.matrix = new Matrix4(this.bodyMatrix);
        this.head.matrix.translate(-0.4, 0.15, -0.0501);
        this.head.matrix.rotate(headJoint, 0, 0, 1);
        this.headMatrix = new Matrix4(this.head.matrix);
        this.head.matrix.scale(0.5, 0.4, 0.5);
        this.head.render();

        // Nose
        this.nose.color = Black;
        this.nose.matrix = new Matrix4(this.headMatrix);
        this.nose.matrix.translate(-0.05, 0.1, 0.2);
        this.nose.matrix.scale(0.1, 0.1, 0.1);
        this.nose.render();

        // Ears
        this.earLeft.color = DarkBrown;
        this.earLeft.matrix = new Matrix4(this.headMatrix);
        this.earLeft.matrix.translate(-0.05, 0.4, 0.05);
        this.earLeft.matrix.scale(0.15, 0.2, 0.1);
        this.earLeft.render();

        this.earRight.color = DarkBrown;
        this.earRight.matrix = new Matrix4(this.headMatrix);
        this.earRight.matrix.translate(-0.05, 0.4, 0.35);
        this.earRight.matrix.scale(0.15, 0.2, 0.1);
        this.earRight.render();

        // Draw eyes
        this.drawEyes([-0.05, 0.2, 0.1]);
        this.drawEyes([-0.05, 0.2, 0.3]);
    }

    drawLeg(position, right, front) {
        let angle1 = front ? frontRightLegJoint1 : backRightLegJoint1;
        let angle2 = front ? frontRightLegJoint2 : backRightLegJoint2;
        let angle3 = front ? frontRightLegJoint3 : backRightLegJoint3;

        // Femur
        this.femur.color = Brown;
        this.femur.textureNum = normalOn ? -3 : this.defaultTextureNum;
        this.femur.matrix = new Matrix4(this.bodyMatrix);
        this.femur.matrix.translate(position[0], position[1], position[2]);

        if (right) {
            this.femur.matrix.rotate(angle1, 0, 0, 1);
        } else {
            this.femur.matrix.rotate(angle1, 0, 0, 1);
        }
        let tempFemurMatrix = new Matrix4(this.femur.matrix);
        this.femur.matrix.scale(0.15, -0.5, -0.15);
        this.femur.render();

        // Tibia
        this.tibia.color = Brown;
        this.tibia.textureNum = normalOn ? -3 : this.defaultTextureNum;
        this.tibia.matrix = new Matrix4(tempFemurMatrix);
        this.tibia.matrix.translate(0, -0.5, 0);

        if (right) {
            this.tibia.matrix.rotate(angle2, 0, 0, 1);
        } else {
            this.tibia.matrix.rotate(angle2, 0, 0, 1);
        }
        let tempTibiaMatrix = new Matrix4(this.tibia.matrix);
        this.tibia.matrix.scale(0.15, -0.45, -0.1);
        this.tibia.render();

        // Foot
        this.foot.color = DarkBrown;
        this.foot.textureNum = normalOn ? -3 : this.defaultTextureNum;
        this.foot.matrix = new Matrix4(tempTibiaMatrix);
        this.foot.matrix.translate(0, -0.45, 0);
        if (right) {
            this.foot.matrix.rotate(angle3, 0, 0, 1);
        } else {
            this.foot.matrix.rotate(angle3, 0, 0, 1);
        }
        this.foot.matrix.scale(0.15, 0.2, 0.1);
        this.foot.render();
    }

    drawTail() {
        this.tail.color = DarkBrown;
        this.tail.matrix = new Matrix4(this.bodyMatrix);
        this.tail.matrix.translate(0.9, 0.1, 0.2);
        this.tail.matrix.rotate(-45, 1, 0, 0);
        this.tail.matrix.scale(0.1, 0.4, 0.1);
        this.tail.render();
    }

    render() {
        if (this.body == null) {
            this.generateCubes();
        }

        this.drawBody();
        this.drawHead();
        this.drawTail();

        this.drawLeg([0.9, -0.2, 0.05], false, false);
        this.drawLeg([0.9, -0.2, 0.55], true, false);

        this.drawLeg([0.05, -0.1, 0.05], false, true);
        this.drawLeg([0.05, -0.1, 0.55], true, true);
    }

    translate(x, y, z) {
        if(this.body == null){
            this.generateCubes();
        }
        this.body.matrix.setTranslate(x, y, z);
    }

    rotate(angle, x, y, z) {
        if(this.body == null){
            this.generateCubes();
        }
        this.body.matrix.rotate(angle, x, y, z);
    }

}
