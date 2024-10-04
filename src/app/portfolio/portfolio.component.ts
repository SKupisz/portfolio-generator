import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ReactiveFormsModule, SkillsComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioForm: FormGroup;
  submitted = false;
  portfolioData: { firstName: string; lastName: string, email: string } = 
  { firstName: '', lastName: '', email: '' };
  skills: string[] = [];

  constructor(private fb: FormBuilder) {
    this.portfolioForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;
    this.portfolioData = this.portfolioForm.value;
  }

  onSkillAdded(skill: string) {
    this.skills.push(skill);
  }

  onSkillDeleted(skill: string) {
    console.log(skill);
     this.skills.splice(this.skills.indexOf(skill),1);
  }
}
