import { z } from "zod";
import { projectTypes, budgets } from "./site";
export const projectSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid work email.").max(254),
  types: z
    .array(z.enum(projectTypes))
    .min(1, "Choose at least one project type."),
  budget: z.enum(budgets),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(5000),
  website: z.string().max(0),
});
export type ProjectInput = z.infer<typeof projectSchema>;
export const formCopy = {
  name: "Your name",
  email: "Work email",
  types: "What are we building?",
  budget: "A budget in mind?",
  message: "A little about your idea",
  submit: "Send my project",
  pending: "Sending your project…",
  note: "No pitch deck needed. Just a good conversation.",
  successTitle: "Your idea is in good hands.",
  successBody: "Thanks for telling us about it. The team will be in touch.",
  missing:
    "Your message could not be delivered. Please email devsdevtech@gmail.com.",
};
