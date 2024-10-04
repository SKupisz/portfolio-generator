import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  @Input() skills: string[] = [];
  @Output() newSkillAdded: EventEmitter<string> = new EventEmitter<string>();
  @Output() skillDeleted: EventEmitter<string> = new EventEmitter<string>();


  onKeyDown(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      const input = (event.target as HTMLInputElement).value;
      this.addNewSkill(input);
      (event.target as HTMLInputElement).value = '';
    }
  }

  addNewSkill(newSkill: string) {
    if(this.skills.indexOf(newSkill) === -1){
      this.newSkillAdded.emit(newSkill);
    }
  }
  deleteSkill(skill: string) {
    if(this.skills.indexOf(skill) !== -1){
      this.skillDeleted.emit(skill);
    }
  }
}
