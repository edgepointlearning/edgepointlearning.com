---
title    : Blog
permalink: '/blog/'
hero     : We Love <b>Learning!</b>
icon     : heart
intro    : <p>As learning experts, we are also voracious learners who never stop seeking knowledge. On our blog, you'll find informative, actionable and fun insights about the learning industry—new trends, new technologies, best practices, customer stories and more. Have a topic you’d like us to delve into or to contribute yourself? <a href="#">Click here</a> to let us know.</p>
---

<section class="box_holder">

{% for post in site.posts %}
  <article class="blog_teaser" style="background-image: url({{site.blog_image_dir}}/{{ post.background }})">
    <a href="{{ post.url | prepend: site.baseurl }}">
      <h3>{{ post.title }}<small>{{ post.date | date: '%B %d, %Y' }}</small></h3>
    </a>
  </article>
{% endfor %}

</section>