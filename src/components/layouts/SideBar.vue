<template>
  <div class="main-sidebar">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <a href="index.html">E-Assets</a>
      </div>
      <div class="sidebar-brand sidebar-brand-sm">
        <a href="index.html">St</a>
      </div>
      <ul class="sidebar-menu">
        <li class="nav-item dropdown active">
          <router-link to="/" class="nav-link"
            ><i class="fas fa-fire"></i><span>Dashboard</span></router-link
          >
        </li>
        <li class="nav-item dropdown">
          <router-link to="/location" class="nav-link"
            ><i class="fas fa-map-marker-alt"></i>
            <span>Location</span></router-link
          >
        </li>
        <li class="nav-item dropdown">
          <router-link to="/item" class="nav-link"
            ><i class="fas fa-th"></i> <span>Items</span></router-link
          >
        </li>
        <li>
          <router-link to="/major" class="nav-link" href="credits.html"
            ><i class="fas fa-pencil-ruler"></i> <span>Major</span></router-link
          >
        </li>
        <li class="nav-item dropdown">
          <router-link to="/borrower" href="#" class="nav-link"
            ><i class="far fa-user"></i> <span>Borrower</span></router-link
          >
        </li>
        <li>
          <router-link to="/role" class="nav-link" href="credits.html"
            ><i class="fas fa-pencil-ruler"></i> <span>Role</span></router-link
          >
        </li>
        <li class="nav-item dropdown">
          <router-link to="/user" href="#" class="nav-link"
            ><i class="far fa-user"></i> <span>User</span></router-link
          >
        </li>
        <li class="nav-item dropdown">
          <router-link to="/transaction" href="#" class="nav-link"
            ><i class="far fa-file-alt"></i>
            <span>Transaction</span></router-link
          >
        </li>
        <li class="nav-item dropdown">
          <router-link to="/detailtransaction" href="#" class="nav-link"
            ><i class="far fa-file-alt"></i> <span>Report</span></router-link
          >
        </li>
        <li class="nav-item dropdown">
          <router-link to="" href="#" class="nav-link"
            ><i class="fas fa-th-large"></i>
            <span>Components</span></router-link
          >
        </li>
        <li>
          <router-link to="" class="nav-link" href="blank.html"
            ><i class="far fa-square"></i> <span>Blank Page</span></router-link
          >
        </li>
      </ul>
      <div class="mt-4 mb-4 p-3 hide-sidebar-mini">
        <router-link
          to=""
          href="https://getstisla.com/docs"
          class="btn btn-primary btn-lg btn-block btn-icon-split"
        >
          <i class="fas fa-rocket"></i> Logout
        </router-link>
      </div>
    </aside>
  </div>
</template>
