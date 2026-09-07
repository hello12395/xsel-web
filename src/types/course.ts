export type CourseType = "prerecorded" | "live";
export type CourseCategory = "design" | "coding" | "business";
export type CourseStatus = "draft" | "published" | "archived";
export type BatchStatus = "upcoming" | "active" | "completed" | "cancelled";
export type PurchaseStatus = "pending" | "approved" | "rejected";

export interface LearningOutcome {
  title: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  course_type: CourseType;
  category: CourseCategory;
  price: number;
  thumbnail_url: string | null;
  instructor_id: string | null;
  status: CourseStatus;
  registration_deadline: string | null;
  course_start_date: string | null;
  fake_enrollments: number;
  learning_outcomes?: LearningOutcome[] | null;
  created_at: string;
  updated_at: string;
}

export type CourseWithLessons = Course & {
  chapters?: Array<{
    id: string;
    lessons?: Array<{
      id: string;
      duration_seconds: number | null;
      status: string;
    }>;
  }>;
};

export interface CourseBatch {
  id: string;
  course_id: string;
  name: string;
  start_date: string | null;
  end_date: string | null;
  registration_deadline: string | null;
  status: BatchStatus;
  max_seats: number | null;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  course_id: string;
  batch_id: string | null;
  amount: number;
  status: PurchaseStatus;
  receipt_url: string | null;
  admin_note: string | null;
  created_at: string;
  approved_at: string | null;
}
