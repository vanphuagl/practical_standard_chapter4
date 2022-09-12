<?php
// top page website
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'    => 'Top page website',
        'menu_title'    => 'Top page website',
        'menu_slug'     => 'Top_page-theme-settings',
        'capability'    => 'edit_posts',
        'redirect'  => false
    ));
}

// service page website

if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'    => 'Service page website',
        'menu_title'    => 'Service page website',
        'menu_slug'     => 'Service_page-theme-settings',
        'capability'    => 'edit_posts',
        'redirect'  => false
    ));
}

// add thumbnail post - featured image
if(!function_exists('agl_theme_setup'))
{
	function agl_theme_setup()
	{
		add_theme_support('automatic-feed-links');
		add_theme_support( 'post-thumbnails' );
        add_theme_support( 'post-formats', array(
            'aside', 'audio', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video'
        ) );
	}
	add_action('init','agl_theme_setup');
}

add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);

// paginaion
function pagination_bar($custom_query = null, $paged = null) {
    global $wp_query;
    if($custom_query) $main_query = $custom_query;
    else $main_query = $wp_query;
    $big = 999999999;
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
    $total = isset($main_query->max_num_pages)?$main_query->max_num_pages:'';
    echo paginate_links( array(
        'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
        'format' => '?paged=%#%',
        'prev_text'    => ' ',
        'next_text'    => ' ',
        'current' => max( 1, $paged),
        'prev_next'    => True,
        'total' => $total
    ) );
}

function wpse_287931_get_categories_names( $object, $field_name, $request ) {
    $formatted_categories[] = array();
    $categories = get_the_category( $object['id'] );

    $i = 0;
    foreach ($categories as $category) {
        $formatted_categories[$i]['category_link'] = get_category_link($category->term_id);
        $formatted_categories[$i]['category_name'] = $category->name;
        $formatted_categories[$i]['category_id'] = $category->term_id;
        $i++;
    }

    return $formatted_categories;
}

function add_category_to_JSON(){
    register_rest_field( 'post', 'categories',
    array(
    'get_callback' => 'wpse_287931_get_categories_names',
    'update_callback' => null,
    'schema' => null,
    ));
}

add_action( 'rest_api_init', 'add_category_to_JSON' );
?>