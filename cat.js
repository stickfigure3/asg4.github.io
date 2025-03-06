// Cat.js

class Cat {
    constructor() {
        this.type = "cat";
        this.generateCubes();
    }

    generateCubes() {
        // Create cube objects for each body part
        this.body = new Cube();
        this.head = new Cube();
        this.leftEar = new Cube();
        this.rightEar = new Cube();
        this.leftEye = new Cube();
        this.rightEye = new Cube();
        this.nose = new Cube();
        this.frontLeftLeg = new Cube();
        this.frontRightLeg = new Cube();
        this.backLeftLeg = new Cube();
        this.backRightLeg = new Cube();
        this.tail = new Cube();
    }

    translate(x, y, z) {
        // Use the body as the main anchor for the whole animal
        this.body.matrix.setTranslate(x, y, z);
    }

    rotate(angle, x, y, z) {
        this.body.matrix.rotate(angle, x, y, z);
    }

    drawBody() {
        // Draw the elongated body (grey color)
        this.body.color = [150, 150, 150, 1];
        // Position body at origin and save the base transformation
        this.body.matrix.translate(0, 0, 0);
        let bodyBase = new Matrix4(this.body.matrix);
        // Scale the cube to form an elongated body
        this.body.matrix.scale(1.5, 0.75, 0.5);
        this.body.render();
        return bodyBase;
    }

    drawHead(bodyBase) {
        // Attach head to the front of the body
        this.head.color = [150, 150, 150, 1];
        this.head.matrix = new Matrix4(bodyBase);
        this.head.matrix.translate(-0.9, 0.5, 0); // adjust position relative to body
        let headBase = new Matrix4(this.head.matrix);
        this.head.matrix.scale(0.5, 0.5, 0.5);
        this.head.render();

        // Left ear
        this.leftEar.color = [150, 150, 150, 1];
        this.leftEar.matrix = new Matrix4(headBase);
        this.leftEar.matrix.translate(0.1, 0.3, 0);
        this.leftEar.matrix.scale(0.2, 0.3, 0.2);
        this.leftEar.render();

        // Right ear
        this.rightEar.color = [150, 150, 150, 1];
        this.rightEar.matrix = new Matrix4(headBase);
        this.rightEar.matrix.translate(0.1, 0.3, 0.3);
        this.rightEar.matrix.scale(0.2, 0.3, 0.2);
        this.rightEar.render();

        // Left eye
        this.leftEye.color = [0, 0, 0, 1];
        this.leftEye.matrix = new Matrix4(headBase);
        this.leftEye.matrix.translate(0.15, 0.1, 0.15);
        this.leftEye.matrix.scale(0.1, 0.1, 0.1);
        this.leftEye.render();

        // Right eye
        this.rightEye.color = [0, 0, 0, 1];
        this.rightEye.matrix = new Matrix4(headBase);
        this.rightEye.matrix.translate(0.15, 0.1, 0.35);
        this.rightEye.matrix.scale(0.1, 0.1, 0.1);
        this.rightEye.render();

        // Nose (pink)
        this.nose.color = [255, 105, 180, 1];
        this.nose.matrix = new Matrix4(headBase);
        this.nose.matrix.translate(0.3, 0, 0.25);
        this.nose.matrix.scale(0.1, 0.1, 0.1);
        this.nose.render();
    }

    drawLegs(bodyBase) {
        // Front left leg
        this.frontLeftLeg.color = [100, 100, 100, 1];
        this.frontLeftLeg.matrix = new Matrix4(bodyBase);
        this.frontLeftLeg.matrix.translate(-0.6, -0.75, 0.1);
        this.frontLeftLeg.matrix.scale(0.2, 0.75, 0.2);
        this.frontLeftLeg.render();

        // Front right leg
        this.frontRightLeg.color = [100, 100, 100, 1];
        this.frontRightLeg.matrix = new Matrix4(bodyBase);
        this.frontRightLeg.matrix.translate(-0.6, -0.75, 0.3);
        this.frontRightLeg.matrix.scale(0.2, 0.75, 0.2);
        this.frontRightLeg.render();

        // Back left leg
        this.backLeftLeg.color = [100, 100, 100, 1];
        this.backLeftLeg.matrix = new Matrix4(bodyBase);
        this.backLeftLeg.matrix.translate(0.6, -0.75, 0.1);
        this.backLeftLeg.matrix.scale(0.2, 0.75, 0.2);
        this.backLeftLeg.render();

        // Back right leg
        this.backRightLeg.color = [100, 100, 100, 1];
        this.backRightLeg.matrix = new Matrix4(bodyBase);
        this.backRightLeg.matrix.translate(0.6, -0.75, 0.3);
        this.backRightLeg.matrix.scale(0.2, 0.75, 0.2);
        this.backRightLeg.render();
    }

    drawTail(bodyBase) {
        // Draw an elongated tail at the rear of the body
        this.tail.color = [150, 150, 150, 1];
        this.tail.matrix = new Matrix4(bodyBase);
        this.tail.matrix.translate(0.8, 0.0, 0.2);
        this.tail.matrix.rotate(30, 0, 0, 1); // tilt the tail upward
        this.tail.matrix.scale(0.8, 0.2, 0.2);
        this.tail.render();
    }

    render() {
        let bodyBase = this.drawBody();
        this.drawHead(bodyBase);
        this.drawLegs(bodyBase);
        this.drawTail(bodyBase);
    }
}
