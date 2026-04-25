import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  stack: [{ type: String }],
  description: { type: String, required: true },
  imageUrl: { type: String },
  githubUrl: { type: String },
  liveUrl: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  coverImage: { type: String },
  scheduledAt: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
}, { timestamps: true });

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String },
  content: { type: String, required: true },
  avatarUrl: { type: String },
}, { timestamps: true });

const SettingsSchema = new Schema({
  email: { type: String },
  location: { type: String },
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  stats: {
    yearsOfExp: { type: String, default: "0+" },
    projectsCompleted: { type: String, default: "0+" },
    technologiesMastered: { type: String, default: "0+" },
  }
}, { timestamps: true });

const AccessRequestSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

const AdminSessionSchema = new Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

export const Project = models.Project || model('Project', ProjectSchema);
export const Experience = models.Experience || model('Experience', ExperienceSchema);
export const Blog = models.Blog || model('Blog', BlogSchema);
export const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);
export const Settings = models.Settings || model('Settings', SettingsSchema);
export const AccessRequest = models.AccessRequest || model('AccessRequest', AccessRequestSchema);
export const AdminSession = models.AdminSession || model('AdminSession', AdminSessionSchema);
