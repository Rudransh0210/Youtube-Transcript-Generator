import React, { useState } from 'react';
import { Youtube, Loader2, FileText, AlertCircle } from 'lucide-react';

export default function TranscriptGenerator() {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://127.0.0.1:5000/get_transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transcript');
      }

      const data = await response.json();
      setTranscript(data.transcript || 'No transcript available.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Youtube className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              YouTube Transcript Generator
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="youtubeUrl" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter YouTube Video URL
              </label>
              <input
                type="url"
                id="youtubeUrl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Generating Transcript...
                </>
              ) : (
                <>
                  <FileText className="-ml-1 mr-2 h-4 w-4" />
                  Get Transcript
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {transcript && (
            <div className="mt-6">
              <label 
                htmlFor="transcript" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Transcript
              </label>
              <textarea
                id="transcript"
                value={transcript}
                readOnly
                className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm bg-gray-50"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}