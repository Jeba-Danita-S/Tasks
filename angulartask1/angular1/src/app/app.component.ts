import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';
  countries: any[] = [];
  searchForm!: FormGroup;
  selectedCountry: any;
  selectedCountryName: string = '';
  selectedCountryCodes: any = {};
  selectedCountryCapital: string = '';
  selectedCountryRegion: string = '';
  selectedCountrySubregion: string = '';
  selectedCountryPopulation: number = 0;
  selectedCountryArea: number = 0;
  selectedCountryTimezones: string[] = [];
  selectedCountryFlag: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.fetchCountries();
  }

  initForm() {
    this.searchForm = new FormGroup({
      location: new FormControl() // Set any initial value if needed
    });
  }

  fetchCountries() {
    this.http.get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe((data: any[]) => {
        this.countries = data;
        console.log(this.countries);
      });
  }

  onSearch() {
    const location = this.searchForm.value.location;
    if (location) {
      this.selectedCountry = this.countries.find(country =>
        country.name.common.toLowerCase().includes(location.toLowerCase())
      );
      if (this.selectedCountry) {
        // Country found
        this.selectedCountryName = this.selectedCountry.name.common;
        this.selectedCountryCodes = this.selectedCountry.cca2 || {};
        this.selectedCountryCapital = this.selectedCountry.capital || '';
        this.selectedCountryRegion = this.selectedCountry.region || '';
        this.selectedCountrySubregion = this.selectedCountry.subregion || '';
        this.selectedCountryPopulation = this.selectedCountry.population || 0;
        this.selectedCountryArea = this.selectedCountry.area || 0;
        this.selectedCountryTimezones = this.selectedCountry.timezones || [];
        this.selectedCountryFlag = this.selectedCountry.flags?.png || '';
      } else {
        // Country not found
        this.selectedCountryName = '';
        this.selectedCountryCodes = {};
        this.selectedCountryCapital = '';
        this.selectedCountryRegion = '';
        this.selectedCountrySubregion = '';
        this.selectedCountryPopulation = 0;
        this.selectedCountryArea = 0;
        this.selectedCountryTimezones = [];
        this.selectedCountryFlag = '';
  
        console.log('Country not found');
        alert("Country not found");
      }
    } else {
      // Empty search box
      this.selectedCountry = null;
      alert("Enter the country name");
    }
  }
  
}

