import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { User } from './models';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Message center';
  current_user: User | undefined;

  @HostBinding('class.dark-theme') isDarkMode = false;

  constructor(
    private overlayContainer: OverlayContainer,
    private userService: UserService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  // getCurrentUser function calls the UserService to get the current user and assign it to a variable current_user
  getCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe((user: User) => {
        console.log('Current User:', user);
        this.current_user = user;
      });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    }
  }
}
