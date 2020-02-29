import { Component, HostBinding, OnInit } from "@angular/core";
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  themeClass: string;
  
  constructor(public overlayContainer: OverlayContainer) {
    this.onSetTheme("dark-theme");
  }
  
  ngOnInit(): void {
    // // subscribe to some source of theme change events, then...
    // this.themeClass = newThemeClass;
    
    // // remove old theme class and add new theme class
    // // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    // const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    // const themeClassesToRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    // if (themeClassesToRemove.length) {
    //    overlayContainerClasses.remove(...themeClassesToRemove);
    // }
    // overlayContainerClasses.add(newThemeClass);
  }
  
  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }
}
