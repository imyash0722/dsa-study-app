import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { UnitPage } from './pages/UnitPage';
import { TopicPage } from './pages/TopicPage';
import { TheoryPracticePage } from './pages/TheoryPracticePage';
import { ProgrammingPracticePage } from './pages/ProgrammingPracticePage';
import { LabListPage } from './pages/LabListPage';
import { LabCompanionPage } from './pages/LabCompanionPage';
import { QuizPage } from './pages/QuizPage';
import { DebuggingLabPage } from './pages/DebuggingLabPage';
import { OutputPredictionPage } from './pages/OutputPredictionPage';
import { RevisionPage } from './pages/RevisionPage';
import { ProgressPage } from './pages/ProgressPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<HomePage />} />

          {/* Curriculum */}
          <Route path="/unit/:unitSlug" element={<UnitPage />} />
          <Route path="/unit/:unitSlug/:topicSlug" element={<TopicPage />} />

          {/* Practice */}
          <Route path="/theory-practice" element={<TheoryPracticePage />} />
          <Route path="/theory-practice/:topicSlug" element={<TheoryPracticePage />} />
          <Route path="/programming-practice" element={<ProgrammingPracticePage />} />
          <Route path="/programming-practice/:topicSlug" element={<ProgrammingPracticePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/output-prediction" element={<OutputPredictionPage />} />
          <Route path="/debugging-lab" element={<DebuggingLabPage />} />

          {/* Labs */}
          <Route path="/labs" element={<LabListPage />} />
          <Route path="/labs/:labSlug" element={<LabCompanionPage />} />

          {/* Resources */}
          <Route path="/revision" element={<RevisionPage />} />
          <Route path="/revision/:unitSlug" element={<RevisionPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
