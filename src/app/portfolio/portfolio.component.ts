import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent, ExperienceData } from '../experience/experience.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ReactiveFormsModule, SkillsComponent, ExperienceComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolioForm: FormGroup;
  submitted = false;
  portfolioData: { firstName: string; lastName: string, email: string } = 
  { firstName: '', lastName: '', email: '' };
  skills: string[] = [];
  jobs: ExperienceData[] = [];
  nextJobId = 1;

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
     this.skills.splice(this.skills.indexOf(skill),1);
  }

  addNewExperience(job: ExperienceData) {
    this.jobs.push(job);
    this.nextJobId+=1;
  }

  deleteExperience(jobId: number) {
    this.jobs = this.jobs.filter((job) => job.id !== jobId);
  }
}
