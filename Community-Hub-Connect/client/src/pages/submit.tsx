import { Header } from "@/components/header";
import { SubmissionForm } from "@/components/submission-form";
import { Footer } from "@/components/footer";

export default function Submit() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SubmissionForm />
      </main>
      <Footer />
    </div>
  );
}
