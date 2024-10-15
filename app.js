document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const addEducationBtn = document.getElementById('add-education');
    const addExperienceBtn = document.getElementById('add-experience');
    const educationContainer = document.getElementById('education-container');
    const experienceContainer = document.getElementById('experience-container');
    const clearFormBtn = document.getElementById('clear-form');
    const addSkillBtn = document.getElementById('add-skill');
    const skillsContainer = document.getElementById('skills-container');
    const newSkillInput = document.getElementById('new-skill');
    
    // Live Update of Preview
    form.addEventListener('input', updatePreview);
  
    // Add more education rows dynamically
    addEducationBtn.addEventListener('click', () => {
      const educationRow = document.createElement('div');
      educationRow.classList.add('education-row');
      educationRow.innerHTML = `
        <input type="text" placeholder="Degree" name="degree[]">
        <input type="text" placeholder="Institution" name="institution[]">
        <input type="text" placeholder="Year" name="year[]">
      `;
      educationContainer.appendChild(educationRow);
    });
  
    // Add more experience rows dynamically
    addExperienceBtn.addEventListener('click', () => {
      const experienceRow = document.createElement('div');
      experienceRow.classList.add('experience-row');
      experienceRow.innerHTML = `
        <input type="text" placeholder="Job Title" name="job-title[]">
        <input type="text" placeholder="Company" name="company[]">
        <input type="text" placeholder="Years" name="years[]">
      `;
      experienceContainer.appendChild(experienceRow);
    });
  
    // Add new skill dynamically when user clicks 'Add Skill' button
    addSkillBtn.addEventListener('click', () => {
      const newSkill = newSkillInput.value.trim();
      if (newSkill) {
        const skillElement = document.createElement('div');
        skillElement.innerHTML = `<input type="checkbox" name="skills" value="${newSkill}" checked> ${newSkill}`;
        skillsContainer.appendChild(skillElement);
        newSkillInput.value = ''; // Clear the input after adding the skill
        updatePreview(); // Update preview after adding the new skill
      }
    });

    document.getElementById('print-resume').addEventListener('click', () => {
        window.print(); // Trigger the print dialog
      });
      
  
    // Clear form and reset preview
    clearFormBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('preview-name').textContent = '[Your Name]';
      document.getElementById('preview-email').textContent = '[Your Email]';
      document.getElementById('preview-phone').textContent = '[Your Phone]';
      document.getElementById('preview-summary').textContent = '[Your Profile Summary]';
      document.getElementById('preview-skills').textContent = '[Your Skills]';
      document.getElementById('preview-education').innerHTML = '<h3>Education</h3>';
      document.getElementById('preview-experience').innerHTML = '<h3>Experience</h3>';
    });
  
    // Update the resume preview in real-time
    function updatePreview() {
      // Personal Information
      document.getElementById('preview-name').textContent = form.name.value || '[Your Name]';
      document.getElementById('preview-email').textContent = form.email.value || '[Your Email]';
      document.getElementById('preview-phone').textContent = form.phone.value || '[Your Phone]';
      document.getElementById('preview-summary').textContent = form.summary.value || '[Your Profile Summary]';
  
      // Skills
      const skills = Array.from(form.querySelectorAll('input[name="skills"]:checked')).map(input => input.value);
      document.getElementById('preview-skills').textContent = skills.length > 0 ? skills.join(', ') : '[Your Skills]';
  
      // Education
      const educationOutput = document.getElementById('preview-education');
      educationOutput.innerHTML = '<h3>Education</h3>'; // Reset education section
      form.querySelectorAll('.education-row').forEach(row => {
        const degree = row.querySelector('input[name="degree[]"]').value || '[Degree]';
        const institution = row.querySelector('input[name="institution[]"]').value || '[Institution]';
        const year = row.querySelector('input[name="year[]"]').value || '[Year]';
        educationOutput.innerHTML += `<p>${degree}, ${institution}, ${year}</p>`;
      });
  
      // Experience
      const experienceOutput = document.getElementById('preview-experience');
      experienceOutput.innerHTML = '<h3>Experience</h3>'; // Reset experience section
      form.querySelectorAll('.experience-row').forEach(row => {
        const jobTitle = row.querySelector('input[name="job-title[]"]').value || '[Job Title]';
        const company = row.querySelector('input[name="company[]"]').value || '[Company]';
        const years = row.querySelector('input[name="years[]"]').value || '[Years]';
        experienceOutput.innerHTML += `<p>${jobTitle}, ${company}, ${years}</p>`;
      });
    }
  });
  