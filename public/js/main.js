document.addEventListener('DOMContentLoaded', () => {
    // Add animations and interactive elements
    
    // Animate todo items on page load
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  
    // Confirm before deleting a todo
    const deleteForms = document.querySelectorAll('.delete-form');
    deleteForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!confirm('Are you sure you want to delete this task?')) {
          e.preventDefault();
        }
      });
    });
  
    // Add task form animations
    const todoForm = document.getElementById('todo-form');
    if (todoForm) {
      const formInputs = todoForm.querySelectorAll('.form-control');
      
      formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          input.parentElement.classList.remove('focused');
        });
      });
  
      // Form submission animation
      todoForm.addEventListener('submit', (e) => {
        const button = todoForm.querySelector('button[type="submit"]');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        button.disabled = true;
        
        // We don't prevent default here to allow the form to actually submit
      });
    }
  
    // Priority color highlighting for select dropdown
    const prioritySelect = document.getElementById('priority');
    if (prioritySelect) {
      const updatePriorityColor = () => {
        const value = prioritySelect.value;
        let color = '';
        
        switch(value) {
          case 'low':
            color = '#10b981';
            break;
          case 'medium':
            color = '#f59e0b';
            break;
          case 'high':
            color = '#ef4444';
            break;
          default:
            color = '#6b7280';
        }
        
        prioritySelect.style.borderLeftColor = color;
        prioritySelect.style.borderLeftWidth = '4px';
      };
      
      prioritySelect.addEventListener('change', updatePriorityColor);
      // Set initial color
      updatePriorityColor();
    }
  });