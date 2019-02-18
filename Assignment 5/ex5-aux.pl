:- module('ex5-aux', 
	[page/4, 
	 namespaces/2, 
	 category/3, 
	 categorylinks/2, 
	 not_member/2,
         s/1,
	 variable/1,
	 variable_list/1,
	 constant/1,
	 constant_list/1
	]).

/*
 * **********************************************
 * Printing result depth
 * 
 * You can enlarge it, if needed.
 * **********************************************
 */
maximum_printing_depth(100).

:- current_prolog_flag(toplevel_print_options, A),
   (select(max_depth(_), A, B), ! ; A = B),
   maximum_printing_depth(MPD),
   set_prolog_flag(toplevel_print_options, [max_depth(MPD)|B]).

% Signature: page(Page_id, Page_namespace, Page_title, Page_len)/4
% Purpose: pages in Wikipedia.
%
page(858585, 0, acid, 34546).
page(689695, 0, adp, 54578).
page(558585, 0, aisi, 5656).
page(558588, 1, aisi, 11).
page(696696, 2, alexkarpman, 5656).
page(696678, 3, alexkarpman, 5656).
page(568585, 6, 'abarak.jpg', 87656).
page(858485, 10, asn, 34).
page(689969, 14, bbc, 5).
page(786983, 14, cnn, 9).
page(578483, 14, nbc, 9).
page(564677, 14, foxnews, 11).
page(786984, 15, cnn, 9).
page(464236, 118, ocpc, 350).

% Signature: namespaces(Ns_number, Ns_name)/2
% Purpose: Wikipedia namespaces.
%
namespaces(0, article).
namespaces(1, article_conversation).
namespaces(2, user).
namespaces(3, user_conversation).
namespaces(4, project).
namespaces(5, project_conversation).
namespaces(6, file).
namespaces(7, file_conversation).
namespaces(8, mediawiki).
namespaces(9, mediawiki_conversation).
namespaces(10, template).
namespaces(11, template_conversation).
namespaces(14, category).
namespaces(15, category_conversation).
namespaces(118, draft).
namespaces(119, draft_conversation).
namespaces(828, module).
namespaces(829, module_conversation).

% Signature: category(Cat_id, Cat_title, Cat_hidden)/3
% Purpose: Wikipedia categories.
%
category(689969, bbc, true).
category(786983, cnn, false).
category(578483, nbc, true).
category(564677, foxnews, false).

% Signature: categorylinks(Cl_from, Cl_to)/2
% Purpose: Pages included in categoies.
%
categorylinks(858585, bbc).
categorylinks(689695, cnn).
categorylinks(558585, bbc).
categorylinks(558585, nbc).
categorylinks(786984, cnn).
categorylinks(464236, foxnews).
categorylinks(786983, bbc).
categorylinks(786983, cnn).
categorylinks(578483, foxnews).
categorylinks(564677, bbc).

% Signature: not_member(Element, List)/2
% Purpose: The relation in which Element is not a member of a List.
%
not_member(_, []).
not_member(X, [Y|Ys]) :- X \= Y, 
                         not_member(X, Ys).
