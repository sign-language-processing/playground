import {Injectable} from '@angular/core';
import {HandsService} from './hands.service';
import * as THREE from 'three';
import {SignWritingStateModel} from './sign-writing.state';
import {BodyService} from './body.service';
import {FaceService} from './face.service';


@Injectable({
  providedIn: 'root'
})
export class SignWritingService {
  constructor(private bodyService: BodyService,
              private faceService: FaceService,
              private handsService: HandsService) {
  }

  static textFontSize(text: string, width: number, ctx: CanvasRenderingContext2D): number {
    ctx.font = '100px SignWriting';
    const measure = ctx.measureText(text);
    const bboxWidth = width * ctx.canvas.width;
    const scale = bboxWidth / measure.width;

    return 100 * scale;
  }

  static drawSWText(text: string, center: THREE.Vector2, fontSize: number, ctx: CanvasRenderingContext2D): void {
    ctx.font = fontSize + 'px SignWriting';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(text, center.x * ctx.canvas.width, center.y * ctx.canvas.height);
  }


  draw(swState: SignWritingStateModel, ctx: CanvasRenderingContext2D): void {
    this.bodyService.draw(swState.body, ctx);
    this.faceService.draw(swState, ctx);
    this.handsService.draw(swState, ctx);
  }
}
