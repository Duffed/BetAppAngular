import { keyframes, style } from '@angular/animations'

export const slideOutRight = [
    style({transform: 'translate3d(150px, 0, 0)', offset: 0}),
    style({transform: 'translate3d(100%, 0, 0)', offset: 1})
]

export const slideOutLeft = [
    style({transform: 'translate3d(-150px, 0, 0)', offset: 0}),
    style({transform: 'translate3d(-100%, 0, 0)', offset: 1})
]

