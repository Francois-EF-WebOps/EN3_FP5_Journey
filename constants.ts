
import { StageType, Phase, TorqueEntry } from './types';

export const TORQUE_TABLE: TorqueEntry[] = [
  { location: 'Engine mount replacement bolts', boltSize: 'M10', torque: '45–50 Nm' },
  { location: 'Side plate secondary mounts', boltSize: 'M8', torque: '22–25 Nm' },
  { location: 'Compression strut rods', boltSize: 'M10', torque: '40 Nm' },
  { location: 'Rear frame U-clamps', boltSize: 'M8/M10', torque: 'Snug + ¼ turn' },
  { location: 'Motor mounting bolts', boltSize: 'M8', torque: '25 Nm' },
  { location: 'Battery tray mounts', boltSize: 'M8', torque: '20 Nm' }
];

export const PHASES: Phase[] = [
  {
    id: 'p01',
    stage: StageType.Foundation,
    title: 'Planning & Skills Audit',
    description: 'The critical first step: audit your tools, workspace, and core competencies before removing the first bolt.',
    tasks: [
      'Inventory required tools: Multimeter, Torque Wrench, Drill, Angle Grinder',
      'Secure a clean, covered workspace with stable power',
      'Audit local shipping and customs for Mauritius imports'
    ],
    checkpoints: [
      { id: 'c1-1', text: 'I have a calibrated Torque Wrench', isMandatory: true },
      { id: 'c1-2', text: 'I understand how to use a Multimeter', isMandatory: true },
      { id: 'c1-3', text: 'I have read the Safety Chapter in full', isMandatory: true }
    ]
  },
  {
    id: 'p02',
    stage: StageType.Foundation,
    title: 'Strip & Measure',
    description: 'Documenting the original Suzuki EN125 geometry is vital for the no-weld structural cassette alignment.',
    tasks: [
      'Document and photograph engine mounts and chain path',
      'Remove ICE components: engine, tank, exhaust, airbox',
      'Measure front engine mount spacing and swingarm pivot distance'
    ],
    checkpoints: [
      { id: 'c2-1', text: 'Chain line measured and documented (±1mm)', isMandatory: true },
      { id: 'c2-2', text: 'Engine mounts cleaned of grease and rust', isMandatory: false },
      { id: 'c2-3', text: 'Photos taken from 4 cardinal angles', isMandatory: true }
    ]
  },
  {
    id: 'p03',
    stage: StageType.Structure,
    title: 'BOSC Reinforcement',
    description: 'Install the Bolt-On Structural Cassette (BOSC) to restore frame rigidity without welding.',
    tasks: [
      'Fabricate 5mm mild steel side plates using engine as template',
      'Install compression struts using M10 threaded rod and spacer tubes',
      'Apply heavy-duty U-clamps to the lower rear frame tubes'
    ],
    checkpoints: [
      { id: 'c3-1', text: 'Side plates sit flush against frame tabs', isMandatory: true },
      { id: 'c3-2', text: 'Thread locker applied to all structural bolts', isMandatory: true },
      { id: 'c3-3', text: 'No visible frame flex when lifting by seat', isMandatory: true }
    ]
  },
  {
    id: 'p04',
    stage: StageType.Powertrain,
    title: 'Mid-Drive Motor Install',
    description: 'Mount the motor ensuring the sprocket aligns with the documented chain line.',
    tasks: [
      'Mount mid-drive motor to BOSC plates',
      'Align output sprocket to original chain line',
      'Tension chain according to Suzuki factory specs'
    ],
    checkpoints: [
      { id: 'c4-1', text: 'Sprocket alignment verified with straightedge', isMandatory: true },
      { id: 'c4-2', text: 'Motor mounting bolts torqued to 25Nm', isMandatory: true }
    ]
  }
];

export const BOM_LIST = [
  { name: 'QS138 70H V3', spec: '4kW Mid-Drive BLDC', source: 'Alibaba/AliExpress', category: 'Power' },
  { name: 'Sabvoton SVMC72150', spec: '48V/72V 150A Controller', source: 'Alibaba/AliExpress', category: 'Power' },
  { name: '48V 50Ah Grade-A Pack', spec: 'NMC/LFP with 100A BMS', source: 'Reputable Local Vendor', category: 'Energy' },
  { name: 'Andersen SB175', spec: 'Main HV Connector (Gray)', source: 'Auto/Electrical Supplier', category: 'Safety' },
  { name: '5mm Mild Steel Plate', spec: 'A36 or similar grade', source: 'Local Scrap/Metal Shop', category: 'Frame' }
];
