import { PublicService } from './services/public.service';
import { keys } from './modules/shared/TS Files/localstorage-key';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './modules/shared/services/i18n/translation.service';
import { ThemeService } from './modules/shared/services/themes/theme.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { DeviceLocationService } from './services/device-location.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'Seems Lab';
  languages = ["en", "ar"];
  browserLang: any;

  currenttheme: any;

  constructor(
    public translationService: TranslationService,
    public translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    public publicService: PublicService,
    public _ThemeService: ThemeService,
    private titleService: Title,
    private router: Router,
  ) {

    //For language site when application is starting
    this.translate.addLangs(this.languages);
    const currentLang = localStorage.getItem(
      keys.language
    );
    if (currentLang !== null && currentLang !== undefined) {
      this.translate.use(currentLang);

      let direction =
        localStorage.getItem(keys.language) === "ar"
          ? "rtl"
          : "ltr";
      document.documentElement.dir = direction;
      document.documentElement.lang = currentLang;

      let getMain = document.getElementsByTagName("html")[0];
      getMain.setAttribute("lang", currentLang);
      getMain.setAttribute("class", currentLang);
    } else {
      this.browserLang = this.translate.getBrowserLang();
      localStorage.setItem(
        keys.language,
        this.browserLang
      );
      this.translate.use(this.browserLang);
      this.translate.setDefaultLang(this.browserLang);
    }

    // For transaltion title at site tab with routing page transalted title from routing
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data) {
              return child.snapshot.data;
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.titleService.setTitle(
            this.translateService.instant(data["title"]) +
            " | " +
            this.translateService.instant("general.sitename")
          );
        } else {
          this.titleService.setTitle(
            this.translateService.instant("general.sitename")
          );
        }
      });
  }


  ngOnInit(): void {
    this.currenttheme = window.localStorage.getItem(keys?.theme);
    if (this.currenttheme == "light") {
      this._ThemeService.setLightTheme();
    }
    if (this.currenttheme == "dark") {
      this._ThemeService.setDarkTheme();
    }
    else {
      this._ThemeService.setLightTheme();
    }
  }

}

