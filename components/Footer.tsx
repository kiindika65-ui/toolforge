export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <h2 className="text-2xl font-bold text-white">
              ToolForge
            </h2>

            <p className="mt-4 text-sm text-gray-400">
              Free online tools made simple.
              Fast, secure, and useful for everyone.
            </p>
          </div>


          <div>
            <h3 className="mb-4 font-semibold text-white">
              Tools
            </h3>

            <ul className="space-y-2 text-sm">
              <li>Calculators</li>
              <li>Image Tools</li>
              <li>Text Tools</li>
              <li>Developer Tools</li>
            </ul>
          </div>


          <div>
            <h3 className="mb-4 font-semibold text-white">
              Company
            </h3>

            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>


          <div>
            <h3 className="mb-4 font-semibold text-white">
              Follow
            </h3>

            <ul className="space-y-2 text-sm">
              <li>GitHub</li>
              <li>Facebook</li>
              <li>YouTube</li>
              <li>Twitter</li>
            </ul>
          </div>

        </div>


        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © 2026 ToolForge. All rights reserved.
        </div>

      </div>
    </footer>
  );
}