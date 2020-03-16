import { keyframes, style, animation, animate } from '@angular/animations'

export const slideOutRight = [
    style({transform: 'translate3d(150px, 0, 0)', offset: 0}),
    style({transform: 'translate3d(100%, 0, 0)', offset: 1})
]

export const slideOutLeft = [
    style({transform: 'translate3d(-150px, 0, 0)', offset: 0}),
    style({transform: 'translate3d(-100%, 0, 0)', offset: 1})
]

export const slideBack = animation([
    style({transform: 'translate3d({{x}}, 0, 0)', offset: 0}),
    style({transform: 'translate3d(0, 0, 0)', offset: 1}),
    animate('{{time}}ms')
])

