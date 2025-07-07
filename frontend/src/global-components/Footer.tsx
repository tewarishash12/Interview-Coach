// components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-white shadow mt-16 py-8 px-4">
            <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-4">
                <div className="text-gray-700 text-sm text-center md:text-left">
                    &copy; {new Date().getFullYear()} AI Interview Coach. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
