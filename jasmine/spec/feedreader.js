/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined and not empty', function () {
            allFeeds.forEach(feed => {
                const url = feed.url;
                expect(url).toBeDefined();
                expect(url.length).toBeGreaterThan(0);
            })
        });

        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('names are defined and not empty', function () {
            allFeeds.forEach(feed => {
                const name = feed.name;
                expect(name).toBeDefined();
                expect(name.length).toBeGreaterThan(0);
            })
        });

    });


     /* Test suite named "The menu" to check menu */
    describe('The menu', function () {

        /* test that ensures the menu element is
         * hidden by default. 
         */
        it('menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('menu changes visibility on icon click', function () {
            // Get icon
            const icon = $('.menu-icon-link')

            // First click on icon (show menu)
            icon.trigger('click')
            /* Make sure menu is visible. If not, make it visible
             * removing menu-hidden class will make it visible
             */
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Second click on icon (hide menu)
            icon.trigger('click')
            // Make sure menu is hidden. If not, hide it
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* test suite named "Initial Entries" checks initial intries */
    describe('Initial Entries', function () {
        
        // load initial feeds
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        it('at least single entry within container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    
    });

    /* test suite named "New Feed Selection" checks the loading
     * of new feeds
     */
    describe('New Feed Selection', function () {
        
         // Variables that will hold old and new feed entries
        let oldFeed;
        let newFeed;

        beforeEach(function (done) {
            // Load first feed
            loadFeed(0, function () {
                oldFeed = $('.feed').html();
                done();
            });
        });

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('content changes when new feed loaded', function (done) {
            // Load second feed
            loadFeed(1, function () {
                newFeed = $('.feed').html();
                // Make sure oldFeed is defined
                expect(oldFeed).toBeDefined();
                // Make sure newFeed is defined
                expect(newFeed).toBeDefined();
                // Make sure are different
                expect(newFeed).not.toEqual(oldFeed);
                done();
            });
        });
    });

}());
