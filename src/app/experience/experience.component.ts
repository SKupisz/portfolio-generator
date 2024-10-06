import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export type ExperienceData = {
  jobTitle: string;
  companyName: string;
  startDate: string;
  currentJob: boolean;
  endDate: string | undefined;
  id: number;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {

  @Input() jobs: ExperienceData[] = [];
  @Input() nextJobId: number = 1;
  @Output() addNewJob: EventEmitter<ExperienceData> = new EventEmitter<ExperienceData>();
  @Output() deleteJob: EventEmitter<number> = new EventEmitter<number>();

  jobTitle = new FormControl('');
  companyName = new FormControl('');
  startDate = new FormControl('');
  endDate = new FormControl('');

  currentJob = false;
  isAddingDisabled = true;

  constructor(){
    this.jobTitle.valueChanges.subscribe(() => this.handleAddingButton());
    this.companyName.valueChanges.subscribe(() => this.handleAddingButton());
    this.startDate.valueChanges.subscribe(() => this.handleAddingButton());
    this.endDate.valueChanges.subscribe(() => this.handleAddingButton());
  }

  toggleCurrentJob() {
    this.currentJob = !this.currentJob;

    // Disable or enable the FormControl based on the flag
    if (this.currentJob) {
      this.endDate.disable();
    } else {
      this.endDate.enable();
    }
    this.handleAddingButton();
  }

  handleAddingButton() {
    this.isAddingDisabled = this.jobTitle.value?.length === 0 
    || this.companyName.value?.length === 0
    || this.startDate.value?.length === 0
    || (!this.currentJob && this.endDate.value?.length === 0);
  }

  addExperience(event: MouseEvent) {
    event.preventDefault();
    const jobTitleValue = this.jobTitle.value ?? '';
    const companyNameValue = this.companyName.value ?? '';
    const jobStartDate = this.startDate.value ?? '';
    const jobEndDate = this.endDate.value ?? '';
    if(jobTitleValue.length > 0 && companyNameValue.length > 0 && jobStartDate.length > 0
      && (this.currentJob || (!this.currentJob && jobEndDate.length > 0))
    ){
      this.addNewJob.emit({
        jobTitle: jobTitleValue,
        companyName: companyNameValue,
        startDate: jobStartDate,
        currentJob: this.currentJob,
        endDate: jobEndDate,
        id: this.nextJobId
      });
      this.jobTitle.setValue('');
      this.currentJob = false;
      this.companyName.setValue('');
      this.endDate.setValue('');
      this.startDate.setValue('');
      this.endDate.enable();
    }
  }

  deleteExperience(id: number) {
    this.deleteJob.emit(id);
  }
}
