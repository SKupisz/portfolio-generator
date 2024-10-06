import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent, ExperienceData } from '../experience/experience.component';
import jsPDF from 'jspdf';

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

  calculateXPosition(text: string, doc: jsPDF, pageWidth: number):number{
    return (pageWidth - doc.getTextWidth(text))/2;
  }

  onSubmit(): void {
    this.submitted = true;
    this.portfolioData = this.portfolioForm.value;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFillColor(51,51,51); // #333 in rgb
    doc.rect(0, 0, pageWidth, pageHeight, 'F'); 

    doc.setTextColor(255, 255, 255); 

    const header = this.portfolioData.firstName + ' '+this.portfolioData.lastName;
    doc.setFontSize(32);
    doc.text(header, this.calculateXPosition(header, doc, pageWidth), 15);
    doc.setFontSize(16);
    doc.text(this.portfolioData.email,this.calculateXPosition(this.portfolioData.email, doc, pageWidth), 25);

    doc.setFontSize(24);
    const experienceHeader = 'Experience';
    doc.text(experienceHeader,this.calculateXPosition(experienceHeader, doc, pageWidth), 47);

    this.jobs.forEach((job, ind) => {
      doc.setFontSize(16);
      doc.text(job.companyName, this.calculateXPosition(job.companyName, doc, pageWidth), 61 + (50*ind));
      doc.setFontSize(14);
      doc.text(job.jobTitle, this.calculateXPosition(job.jobTitle, doc, pageWidth), 69 + (50*ind));
      const dates = `${job.startDate} - ${job.currentJob ? 'Now' : job.endDate}`;
      doc.text(dates, this.calculateXPosition(dates, doc, pageWidth), 83 + (50*ind));
    });

    doc.setFontSize(24);
    const skillsHeader = 'Skills';
    doc.text(skillsHeader, (pageWidth - doc.getTextWidth(skillsHeader))/2, 75 + 50*this.jobs.length);
    doc.setFontSize(16);
    const skills = this.skills.join(', ');
    doc.text(skills, (pageWidth - doc.getTextWidth(skills))/2, 85 + 50*this.jobs.length);


    doc.save(`CV-${this.portfolioData.firstName}-${this.portfolioData.lastName}.pdf`);
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
