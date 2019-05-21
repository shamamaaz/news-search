import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'news-search';
  public data = Array();
  public nextPage: number;
  public searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchName: ['', Validators.required]

    });
  }
  search() {
    if (this.searchForm.valid) {
      this.searchService.search(this.searchForm.value.searchName)
        .subscribe((response) => {
          if (response) {
            this.data = response.hits;
            this.nextPage = response.page;
          }
        });
    }
  }
  next() {
    this.nextPage = this.nextPage + 1;
    this.searchService.next(this.searchForm.value.searchName, this.nextPage)
      .subscribe((response) => {
        if (!response) return;
        if (response) {
          this.data = response.hits;
        }
      });
 }
}
