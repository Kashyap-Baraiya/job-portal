export default function Footer() {
  return (
<footer className="border bg-[#f4f4fd] border-gray-300 ">
  
  <div class="max-w-7xl mx-auto px-6 py-12">
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      
      <div>
        <h2 class="text-xl font-bold ">JobPortal</h2>
        <p class="mt-4 text-sm leading-6">
          Find your dream job and connect with top companies. 
          Build your career with confidence.
        </p>
      </div>

     
      <div>
        <h3 class="text-lg font-semibold  mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="/home" class="hover:text-gray-600 transition">Home</a></li>
          <li><a href="/brows" class="hover:text-gray-600 transition">Browse Jobs</a></li>
        </ul>
      </div>

 
      <div>
        <h3 class="text-lg font-semibold  mb-4">Categories</h3>
        <ul class="space-y-2 text-sm">
          <li>IT & Software</li>
          <li>Finance</li>
          <li>Design</li>
        </ul>
      </div>

     
      <div>
        <h3 class="text-lg font-semibold mb-4">Contact</h3>
        <p class="text-sm">Email: krbaraiya@223@gmail.com</p>
        <p class="text-sm mt-2">Phone: +91 74055 43210</p>
      </div>

    </div>

    
    <div class="border-t border-gray-300 mt-10 pt-6 text-center text-sm">
      © 2026 JobPortal. All rights reserved.
    </div>

  </div>
  
</footer>
  )
}

