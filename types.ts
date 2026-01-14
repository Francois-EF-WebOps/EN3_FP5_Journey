
export enum StageType {
  Foundation = 'Foundation',
  Structure = 'Structure',
  Powertrain = 'Powertrain',
  Energy = 'Energy',
  Electrical = 'Electrical',
  Validation = 'Validation',
  Operation = 'Operation'
}

export interface ChecklistItem {
  id: string;
  text: string;
  category?: string;
  isMandatory: boolean;
}

export interface Phase {
  id: string;
  stage: StageType;
  title: string;
  description: string;
  tasks: string[];
  checkpoints: ChecklistItem[];
  components?: ComponentItem[];
}

export interface ComponentItem {
  name: string;
  spec: string;
  source: string;
  category: 'Power' | 'Energy' | 'Frame' | 'Electrical' | 'Safety';
}

export interface TorqueEntry {
  location: string;
  boltSize: string;
  torque: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
