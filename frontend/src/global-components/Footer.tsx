// components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-white shadow mt-16 py-8 px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-4">
                <div className="text-gray-700 text-sm">
                    &copy; {new Date().getFullYear()} AI Interview Coach. All rights reserved.
                </div>
                <ul className="flex flex-wrap gap-6 text-sm text-gray-500">
                    <li><a href="/about" className="hover:text-purple-500">About</a></li>
                    <li><a href="/contact" className="hover:text-purple-500">Contact</a></li>
                    <li><a href="/terms" className="hover:text-purple-500">Terms</a></li>
                    <li><a href="/privacy" className="hover:text-purple-500">Privacy</a></li>
                    <li>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
                            <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775A4.932 4.932 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.195A4.92 4.92 0 0016.616 3c-2.717 0-4.924 2.206-4.924 4.924 0 .386.044.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.149c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099A4.904 4.904 0 01.964 8.1v.062c0 2.385 1.697 4.374 3.946 4.827-.413.112-.849.172-1.296.172-.317 0-.626-.031-.927-.088.627 1.956 2.444 3.377 4.6 3.417A9.868 9.868 0 010 21.543a13.94 13.94 0 007.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" /></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
