<template>
  <div class="main-content">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>Tambah Item</h4>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label>Text</label>
              <input type="text" class="form-control" />
            </div>
            <div class="form-group">
              <label>Select</label>
              <select class="form-control">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div class="form-group">
              <label>Textarea</label>
              <textarea class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label class="d-block">Checkbox</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">
                  Checkbox 1
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="defaultCheck3"
                />
                <label class="form-check-label" for="defaultCheck3">
                  Checkbox 2
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Date</label>
              <input type="date" class="form-control" />
            </div>
            <div class="form-group">
              <label>Datetime Local</label>
              <input type="datetime-local" class="form-control" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" />
            </div>
            <div class="form-group">
              <label>File</label>
              <input type="file" class="form-control" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
