---
title: A Sample Blog Post
permalink: /blog/sample-post/
image: gcw/mance.jpg
#imagepos: "top right" # optional to change hero image position. default is "center center"

meta: This is a SAMPLE BLOG POST. It's here so you can see how text and images can be formatted in a blog post.
author: { 
  name: "Michelle Moorhead",
  title:  "Executive Director, Teen Lifeline",
  image: "blog/michelle-moorhead.jpg", 
  bio: "Michelle Moorhead is the Executive Director of [Teen Lifeline](https://teenlifeline.org/), a 34 year old nonprofit focused on the prevention of youth suicide. Ms. Moorhead possesses a Master's Degree in Psychology from the University of Northern Colorado with an emphasis in adolescent psychology.  She is a state Licensed Professional Counselor and a Certified Crisis Counselor through the American Association of Suicidology. She has been working in the behavioral health field for the past 36 years. In 2004, she was named Arizona’s Executive Director of the Year by the Organization of Non-Profit Executives. She has extensive experience presenting at both the local and national level in the area of teen suicide prevention, crisis intervention, and utilizing volunteers."
}
date: 2020-06-01
---

Few things in business are more guaranteed to produce groans than ice-breaking or team-building activities. Why? Because most of these feel forced and inauthentic, placing employees in uncomfortable situations with strangers and forcing them to make the best of it.
{: .featured-text }

The right training program empowers all of your employees—from your front-line to your executives—to make decisions that promote safety, efficiency, and productivity. It also makes that training available right at their point of need, providing mobile-ready solutions wherever they go.

## Images

SVG's and raster images are handled differently so look out!
{: .fancy-text }

### SVG

Here's a normal-width SVG:

{% svg '/assets/svg/blog/2017-05-17-what-is-mlearning-04.svg' alt='Benefits of mLearning' %}

A full-width SVG:

{% svg '/assets/svg/blog/2017-03-01-elearning-vs-traditional-learning-infographic.svg' alt='eLearning vs Traditional Learning' class='image-wide' %}
   
### Raster

Normal images are 670px wide

{% picture blog gcw/ach.jpg --alt ACH %}

Wide images are 1170px wide

{% picture blog-wide gcw/tankman.jpg --alt Calvin Tankman %}

Picture with a link

{% picture blog gcw/allie.jpg --link https://vimeo.com/357947965/62d47befc5 --alt Allison Kat %}

SVG with a link

Uh, looks like this is broken. No SVG's with links for now.

### Smaller images can be floated

Be careful on mobile sizes. They'll look weird if they float on a phone.
{: .fancy-text }

{% picture blog gcw/rsp.jpg class="float-right thumbnail" width="400px" --alt Rickey Shane Page %}
<!-- todo: figure out responsive floats? -->

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{: .clearfix }

{% picture blog gcw/gresham.jpg class="float-left thumbnail" width="270px" --alt John Gresham %}

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{: .clearfix }

Don't forget to add a `.clearfix` class to the paragraph or block element that follows a floated image!
{: .fancy-text }

## Text Styles

If your new employees need equipment or software for training, make sure they have it. Do they need access to upper management or HR to ask questions? Include that in your training resources.

The **delivery method** will depend on the *information* itself. Microlearning training takes ***300% less time*** and costs 50% less for you to put together. New hires can learn on their own time (and take learning with them wherever they go). Since most employees can only dedicate 1% of their workweek to training, it's time to make those 24 minutes more effective, more engaging, and maybe even a little fun.

Since 2007, EdgePoint Learning has delivered eLearning solutions that drive your company's performance and business goals while also enriching your employee's capabilities. As an eLearning development company, we know that employee training is only effective when it's engaging. We also know that it takes a thoughtful collaborative approach between our team and yours to create successful programs that meet the needs your company and employees. Since 2007, EdgePoint Learning has delivered eLearning solutions that drive your company's performance and business goals while also enriching your employee's capabilities. As an eLearning development company, we know that employee training is only effective when it's engaging. We also know that it takes a thoughtful collaborative approach between our team and yours to create successful programs that meet the needs your company and employees.


AR enables immersive training without leaving the workplace, it provides new ways for trainers to illustrate, demonstrate, and explain.
{: .fancy-quote }

Leadership training for employees can be engaging, thought-provoking, and truly productive when it comes to building teams. Here's how. 
{: .fancy-text }

Leadership training for employees can be engaging, thought-provoking, and truly productive when it comes to building teams. Here's how. 
{: .fancy-text--small }

Our blog post on [gamification](/blog/gamification-in-elearning/) is really neat.

You can visit [Wikipedia's gamification article](https://en.wikipedia.org/wiki/Gamification) to learn more.

## Howdy! (This is an H2. Don't use H1.)

This is an example blog post that shows several types of HTML content supported in this theme.

## Embeds

### Wide
<div class="responsive-embed widescreen">
  <iframe src="https://player.vimeo.com/video/229428936"
          loading=lazy
          width="480" 
          height="380" 
          frameborder="0" 
          webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

## Normal
<div class="responsive-embed">
  <iframe src="https://player.vimeo.com/video/219609124"
          loading=lazy
          width="480" 
          height="380" 
          frameborder="0" 
          webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

## Common Styling

Taken from [kramdown quick reference.](https://kramdown.gettalong.org/quickref.html)

### Footnotes

Footnotes are supported as part of the Markdown syntax. Here's one in action. Clicking this number[^fn-sample_footnote] will lead you to a footnote.

### Emphasis

**To bold text**, use `**`.

*To italicize text*, use `*`.

### Blockquotes
> Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.

<cite>**Michael Scott**, The Office</cite>


### Block Attributes

This paragraph has an ID, a Title, and a class applied to it.
{: .c3 title="t" #para}

### Inline Attributes

This is *red*{: style="color: red"} but only that one word.

### Abbreviations:

This is an HTML example.

*[HTML]: Hyper Text Markup Language

## Lists

Unordered Lists:

* Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
* Donec id elit non mi porta gravida at eget metus.
* Nulla vitae elit libero, a pharetra augue.

Ordered Lists:

1. Vestibulum id ligula porta felis euismod semper.
2. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
3. Maecenas sed diam eget risus varius blandit sit amet non magna.

## Tables

This table has styling applied to restrict its width:

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
{: style="max-width:670px;margin-left:auto;margin-right:auto" }

Othewise, tables are full-width by default:

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

If your new employees need equipment or software for training, make sure they have it. Do they need access to upper management or HR to ask questions? Include that in your training resources.

[^fn-sample_footnote]: Handy! Now click the return link to go back.
