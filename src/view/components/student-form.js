const backend_url = 'http://localhost:3001/students';
const formElement = document.querySelector('form');

// --- function decalarations ---

function editStudentHandler(event) {
  console.log('editStudentHandler event.details:', event.detail);
  render(event.detail);
}

function addStudent(student) {
  console.log('Add student', student);
  // remove id from student object, otherwise the id will not be generated by the backend
  delete student.id;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  };
  fetch(backend_url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

function updateStudent(student) {
  const url = `${backend_url}/${student.id}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      location.reload();
    });
}

function formSubmitHandler(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  console.log('formSubmitHandler data:', data);

  if (data.id) {
    updateStudent(data);
  } else {
    addStudent(data);
  }
}

function render(student = {}) {
  console.log('Render form', student);
  formElement.name.value = student.name || '';
  formElement.studentnr.value = student.studentnr || '';
  formElement.photo.value = student.photo || '';
  formElement.id.value = student.id || '';
  formElement.querySelector(`[name=gender][value=${student?.gender || 'other'}]`).checked = true;

  if (!student.id) {
    formElement.querySelector('button[type=submit]').textContent = 'Add student';
  } else {
    formElement.querySelector('button[type=submit]').textContent = 'Update student';
  }
}

// --- student-form main ---

render();
formElement.addEventListener('submit', formSubmitHandler);
document.addEventListener('edit-student', editStudentHandler);