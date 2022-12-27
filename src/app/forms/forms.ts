import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
selector: 'form-learn',
templateUrl: './forms.html'
})
export class MyForms {

}

@Component({
    selector: 'my-form-group',
    template: `
    <form [formGroup]="profileForm">
    <div>
      First Name:
      <input type="text" formControlName="firstName" />
    </div>
    <div>
      Last Name:
      <input type="text" formControlName="lastName" />
    </div>

    <div>
      Subscribe:
      <input type="checkbox" formControlName="subscribed" />
    </div>

    <div>Disabled: <input formControlName="disabledInput" /></div>
    <div formArrayName="addresses">
      <div *ngFor="let item of itemControls; let i = index" [formGroupName]="i">
        <div>City: <input formControlName="city" /></div>
      </div>
    </div>
    <button (click)="addCity()">Add City</button>
  </form>
    `
})
export class MyReactiveFormGroup {
    profileForm!: FormGroup;
    addresses!: FormArray;

    get itemControls() {
        return (this.profileForm.get('addresses') as FormArray).controls;
      }
    
      constructor(private formBuilder: FormBuilder) {
        // We use this reference in our test
        (window as any).reactiveFormsComponent = this;
      }
    
      ngOnInit() {
        this.profileForm = new FormGroup({
          firstName: new FormControl('', Validators.required),
          lastName: new FormControl(''),
          addresses: new FormArray([]),
          subscribed: new FormControl(),
          disabledInput: new FormControl({value: '', disabled: true}),
        });
    
        this.addCity();
      }
    
      createItem(): FormGroup {
        return this.formBuilder.group({
          city: '',
        });
      }
    
      addCity(): void {
        this.addresses = this.profileForm.get('addresses') as FormArray;
        this.addresses.push(this.createItem());
      }
}